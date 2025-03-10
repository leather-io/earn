import { Dispatch, SetStateAction } from 'react';
import { NavigateFunction } from 'react-router-dom';

import { ContractCallRegularOptions, showContractCall } from '@stacks/connect';
import { StacksNetwork, StacksNetworkName } from '@stacks/network';
import { PoxInfo, StackingClient, poxAddressToTuple } from '@stacks/stacking';
import { ClarityValue, bufferCV, noneCV, principalCV, someCV, uintCV } from '@stacks/transactions';
import * as yup from 'yup';

import { UI_IMPOSED_MAX_STACKING_AMOUNT_USTX } from '@constants/app';
import { cyclesToBurnChainHeight } from '@utils/calculate-burn-height';
import { stxToMicroStx, toHumanReadableStx } from '@utils/unit-convert';
import { stxAmountSchema } from '@utils/validators/stx-amount-validator';

import { pools } from './components/preset-pools';
import { EditingFormValues } from './types';
import { PoolName, PoxContractName } from './types-preset-pools';
import { getNetworkInstance, getPoxContractAddressAndName } from './utils-preset-pools';

interface Args {
  /**
   * The address of the currently active account. Used to ensure users don't delegate to themselves,
   * which although technically possible, is most likely not what they want.
   */
  currentAccountAddress: string;

  networkName: StacksNetworkName;
}
export function createValidationSchema(_args: Args) {
  return yup.object().shape({
    poolAddress: yup.string(),
    //   .when('poolName', {
    //   is: 'Custom Pool',
    //   then: schema =>
    //     stxPrincipalSchema(schema, networkName).test({
    //       name: 'cannot-pool-to-yourself',
    //       message: 'Cannot pool to your own STX address',
    //       test(value) {
    //         return value !== currentAccountAddress;
    //       },
    //     }),
    //   otherwise: schema => schema.optional(),
    // }),
    amount: stxAmountSchema()
      .test({
        name: 'test-min-allowed-delegated-stacking',
        message: "You must delegate at least the pool's minimum.",
        test(value, context) {
          const poolName = context.parent.poolName as PoolName;
          if (!poolName) return true;
          const minDelegatedStackingAmount = pools[poolName].minimumDelegationAmount;
          const enteredAmount = stxToMicroStx(value || 0);
          if (enteredAmount.isLessThan(minDelegatedStackingAmount)) {
            return context.createError({
              message: `You must delegate at least ${toHumanReadableStx(
                minDelegatedStackingAmount
              )}`,
            });
          } else {
            return true;
          }
        },
      })
      .test({
        name: 'test-max-allowed-delegated-stacking',
        message: `You cannot delegate more than ${toHumanReadableStx(
          UI_IMPOSED_MAX_STACKING_AMOUNT_USTX
        )}`,
        test(value) {
          if (value === undefined) return false;
          const enteredAmount = stxToMicroStx(value);
          return enteredAmount.isLessThanOrEqualTo(UI_IMPOSED_MAX_STACKING_AMOUNT_USTX);
        },
      }),
    delegationDurationType: yup.string().required('Please select the delegation duration type.'),
  });
}

function getOptions(
  values: EditingFormValues,
  poxInfo: PoxInfo,
  stackingContract: string,
  client: StackingClient,
  network: StacksNetwork
): ContractCallRegularOptions {
  const untilBurnBlockHeight =
    values.delegationDurationType === 'limited'
      ? cyclesToBurnChainHeight({
          cycles: values.numberOfCycles,
          rewardCycleLength: poxInfo.reward_cycle_length,
          currentCycleId: poxInfo.current_cycle.id,
          firstBurnchainBlockHeight: poxInfo.first_burnchain_block_height,
        })
      : undefined;
  const pool = values.poolName ? pools[values.poolName] : undefined;
  if (!pool) throw new Error('Invalid Pool Name');
  const networkMode = getNetworkInstance(network);
  const delegateTo = pool.poolAddress?.[networkMode] || values.poolAddress;

  if (values.poolName === PoolName.CustomPool) {
    return client.getDelegateOptions(
      {
        contract: stackingContract,
        amountMicroStx: stxToMicroStx(values.amount).toString(),
        delegateTo,
        untilBurnBlockHeight,
      }
      // Type coercion necessary because the `network` property returned by
      // `client.getStackingContract()` has a wider type than allowed by `showContractCall`. Despite
      // the wider type, the actual value of `network` is always of the type `StacksNetwork`
      // expected by `showContractCall`.
      //
      // See
      // https://github.com/hirosystems/stacks.js/blob/0e1f9f19dfa45788236c9e481f9a476d9948d86d/packages/stacking/src/index.ts#L1054
    ) as ContractCallRegularOptions;
  } else {
    const [contractAddress, contractName] = getPoxContractAddressAndName(
      networkMode,
      pool.poxContract
    );

    let functionArgs: ClarityValue[];
    switch (pool.poxContract) {
      case PoxContractName.WrapperOneCycle:
        functionArgs = [
          uintCV(stxToMicroStx(values.amount).toString()),
          principalCV(delegateTo),
          untilBurnBlockHeight ? someCV(uintCV(untilBurnBlockHeight)) : noneCV(),
          noneCV(),
          poxAddressToTuple(values.rewardAddress),
          noneCV(),
        ];
        break;
      case PoxContractName.WrapperFastPoolV2:
        functionArgs = [
          uintCV(stxToMicroStx(values.amount).toString()),
          bufferCV(new Uint8Array(0)),
        ];
        break;
      case PoxContractName.WrapperFastPool:
      case PoxContractName.WrapperRestake:
        functionArgs = [uintCV(stxToMicroStx(values.amount).toString())];
        break;
      default:
        functionArgs = [];
    }
    return {
      contractAddress,
      contractName,
      functionName: 'delegate-stx',
      functionArgs,
      network,
    };
  }
}
interface CreateHandleSubmitArgs {
  client: StackingClient;
  network: StacksNetwork;
  setIsContractCallExtensionPageOpen: Dispatch<SetStateAction<boolean>>;
  navigate: NavigateFunction;
}
export function createHandleSubmit({
  client,
  network,
  setIsContractCallExtensionPageOpen,
  navigate,
}: CreateHandleSubmitArgs) {
  return async function handleSubmit(values: EditingFormValues, onFinish?: () => void) {
    // TODO: handle thrown errors
    const [poxInfo, stackingContract] = await Promise.all([
      client.getPoxInfo(),
      client.getStackingContract(),
    ]);

    const delegateStxOptions = getOptions(values, poxInfo, stackingContract, client, network);

    showContractCall({
      ...delegateStxOptions,
      onFinish() {
        setIsContractCallExtensionPageOpen(false);
        onFinish?.();
        navigate('../pooled-stacking-info');
      },
      onCancel() {
        setIsContractCallExtensionPageOpen(false);
      },
    });
    setIsContractCallExtensionPageOpen(true);
  };
}
