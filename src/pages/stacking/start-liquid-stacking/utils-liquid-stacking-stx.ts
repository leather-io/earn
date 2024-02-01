import { Dispatch, SetStateAction } from 'react';
import { NavigateFunction } from 'react-router-dom';

import { ContractCallRegularOptions, openContractCall } from '@stacks/connect';
import { StacksNetwork } from '@stacks/network';
import { PoxInfo, StackingClient } from '@stacks/stacking';
import {
  FungibleConditionCode,
  contractPrincipalCV,
  makeStandardSTXPostCondition,
  noneCV,
  uintCV,
} from '@stacks/transactions';
import * as yup from 'yup';

import { UI_IMPOSED_MAX_STACKING_AMOUNT_USTX } from '@constants/app';
import { stxToMicroStx, toHumanReadableStx } from '@utils/unit-convert';
import { stxAmountSchema } from '@utils/validators/stx-amount-validator';

import { protocols } from './components/preset-protocols';
import { EditingFormValues } from './types';
import { PoxContractName, ProtocolName } from './types-preset-protocols';
import { getNetworkInstance, getPoxContractAddressAndName } from './utils-preset-protocols';

export function createValidationSchema() {
  return yup.object().shape({
    amount: stxAmountSchema()
      .test({
        name: 'test-min-allowed-stacking',
        message: "You must stack at least the protocol's minimum.",
        test(value, context) {
          const protocolName = context.parent.protocolName as ProtocolName;
          if (!protocolName) return true;
          const minDelegatedStackingAmount = protocols[protocolName].minimumDelegationAmount;
          const enteredAmount = stxToMicroStx(value || 0);
          if (enteredAmount.isLessThan(minDelegatedStackingAmount)) {
            return context.createError({
              message: `You must stack at least ${toHumanReadableStx(minDelegatedStackingAmount)}`,
            });
          } else {
            return true;
          }
        },
      })
      .test({
        name: 'test-max-allowed-stacking',
        message: `You cannot stack more than ${toHumanReadableStx(
          UI_IMPOSED_MAX_STACKING_AMOUNT_USTX
        )}`,
        test(value) {
          if (value === undefined) return false;
          const enteredAmount = stxToMicroStx(value);
          return enteredAmount.isLessThanOrEqualTo(UI_IMPOSED_MAX_STACKING_AMOUNT_USTX);
        },
      }),
  });
}

function getOptions(
  values: EditingFormValues,
  poxInfo: PoxInfo,
  stackingContract: string,
  client: StackingClient,
  network: StacksNetwork
): ContractCallRegularOptions {
  const protocol = values.protocolName ? protocols[values.protocolName] : undefined;
  if (!protocol) throw new Error('Invalid Protocol Name');
  const networkMode = getNetworkInstance(network);

  const [contractAddress, contractName] = getPoxContractAddressAndName(
    networkMode,
    protocol.poxContract
  );
  const stxAmount = stxToMicroStx(values.amount).toString();
  const stxAddress = values.stxAddress;
  const functionArgs =
    protocol.poxContract === PoxContractName.WrapperStackingDAO
      ? [contractPrincipalCV(contractAddress, 'reserve-v1'), uintCV(stxAmount), noneCV()]
      : [];
  const postConditions = [
    makeStandardSTXPostCondition(stxAddress!, FungibleConditionCode.LessEqual, stxAmount),
  ];
  return {
    contractAddress,
    contractName,
    functionName: 'deposit',
    functionArgs,
    postConditions,
    network,
  };
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
  return async function handleSubmit(values: EditingFormValues) {
    // TODO: handle thrown errors
    const [poxInfo, stackingContract] = await Promise.all([
      client.getPoxInfo(),
      client.getStackingContract(),
    ]);

    const liquidStackStxOptions = getOptions(values, poxInfo, stackingContract, client, network);

    openContractCall({
      ...liquidStackStxOptions,
      onFinish() {
        setIsContractCallExtensionPageOpen(false);
        navigate('../direct-stacking-info');
      },
      onCancel() {
        setIsContractCallExtensionPageOpen(false);
      },
    });
    setIsContractCallExtensionPageOpen(true);
  };
}
