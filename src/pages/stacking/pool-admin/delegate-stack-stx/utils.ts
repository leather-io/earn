import { Dispatch, SetStateAction } from 'react';

import { AccountsApi, SmartContractsApi, TransactionsApi } from '@stacks/blockchain-api-client';
import { ContractCallRegularOptions, FinishedTxData, openContractCall } from '@stacks/connect';
import { StacksNetwork, StacksNetworkName } from '@stacks/network';
import { StackingClient } from '@stacks/stacking';
import BigNumber from 'bignumber.js';
import * as yup from 'yup';

import { validateDecimalPrecision } from '@utils/form/validate-decimals';
import { stxToMicroStx } from '@utils/unit-convert';
import { createBtcAddressSchema } from '@utils/validators/btc-address-validator';
import { stxPrincipalSchema } from '@utils/validators/stx-address-validator';
import { stxAmountSchema } from '@utils/validators/stx-amount-validator';

import { getDelegationStatus } from '../../pooled-stacking-info/get-delegation-status';
import { getAvailableAmountForLockingInSTX } from './components/choose-stacker';
import { DelegateStackStxFormValues } from './types';

interface CreateValidationSchemaArgs {
  currentAccountAddress: string | null;

  /**
   * The current burn height
   */
  currentBurnHt: number;

  /**
   * The name of the network the app is live on, e.g., mainnet or testnet.
   */
  networkName: StacksNetworkName;

  network: StacksNetwork;
  accountsApi: AccountsApi;
  transactionsApi: TransactionsApi;
  smartContractsApi: SmartContractsApi;
}
export function createValidationSchema({
  currentAccountAddress,
  currentBurnHt,
  network,
  networkName,
  accountsApi,
  transactionsApi,
  smartContractsApi,
}: CreateValidationSchemaArgs) {
  return yup.object().shape({
    stacker: stxPrincipalSchema(yup.string(), networkName).test(
      'test-pool-membership',
      'Stacker must be a pool member',
      async value => {
        const stackingClient = new StackingClient(value, network);
        const delegationStatus = await getDelegationStatus({
          stackingClient,
          accountsApi,
          transactionsApi,
          smartContractsApi,
          address: value,
        });
        return (
          delegationStatus.isDelegating && delegationStatus.delegatedTo === currentAccountAddress
        );
      }
    ),
    amount: stxAmountSchema()
      .test(
        'test-available-locking-amount',
        'You cannot stack more than the delegated amount or the balance',
        async (value, context) => {
          const stacker = context.parent.stacker;
          const stackingClient = new StackingClient(stacker, network);
          const [delegationStatus, extendedBalances] = await Promise.all([
            getDelegationStatus({
              stackingClient,
              accountsApi,
              transactionsApi,
              smartContractsApi,
              address: stacker,
            }),
            stackingClient.getAccountExtendedBalances(),
          ]);
          if (!delegationStatus.isDelegating) return true;
          const availableAmountForLocking = getAvailableAmountForLockingInSTX(
            delegationStatus.amountMicroStx,
            extendedBalances
          );
          return new BigNumber(availableAmountForLocking).isGreaterThanOrEqualTo(value);
        }
      )
      .test('test-precision', 'You cannot stack with a precision of less than 1 STX', value => {
        // If `undefined`, throws `required` error
        if (value === undefined) return true;
        return validateDecimalPrecision(0)(value);
      }),
    lockPeriod: yup.number().defined(),
    startBurnHt: yup.number().test({
      name: 'test-future-start-burn-height',
      message: 'Start burn height must be in the future.',
      test: value => {
        if (value === null || value === undefined) return false;
        return value > currentBurnHt;
      },
    }),
    poxAddress: createBtcAddressSchema({
      network: networkName,
      // TODO
      isPostPeriod1: true,
    }),
  });
}

interface CreateHandleSubmitArgs {
  client: StackingClient;
  setIsContractCallExtensionPageOpen: Dispatch<SetStateAction<boolean>>;
  setTxResult: Dispatch<SetStateAction<FinishedTxData | undefined>>;
  network: StacksNetwork;
}
export function createHandleSubmit({
  client,
  setIsContractCallExtensionPageOpen,
  setTxResult,
  network,
}: CreateHandleSubmitArgs) {
  return async function handleSubmit(values: DelegateStackStxFormValues) {
    if (values.amount === null) throw new Error('Expected a non-null amount to be submitted.');

    // TODO: handle thrown errors
    const [stackingContract] = await Promise.all([client.getStackingContract()]);
    const delegateStackStxOptions = client.getDelegateStackOptions({
      contract: stackingContract,
      stacker: values.stacker,
      amountMicroStx: stxToMicroStx(values.amount).toString(),
      cycles: values.lockPeriod,
      poxAddress: values.poxAddress,
      burnBlockHeight: values.startBurnHt,
    });

    openContractCall({
      // Type coercion necessary because the `network` property returned by
      // `client.getStackingContract()` has a wider type than allowed by `openContractCall`. Despite
      // the wider type, the actual value of `network` is always of the type `StacksNetwork`
      // expected by `openContractCall`.
      //
      // See
      // https://github.com/hirosystems/stacks.js/blob/0e1f9f19dfa45788236c9e481f9a476d9948d86d/packages/stacking/src/index.ts#L1054
      ...(delegateStackStxOptions as ContractCallRegularOptions),
      network,
      onFinish(data) {
        setTxResult(data);
        setIsContractCallExtensionPageOpen(false);
      },
      onCancel() {
        setIsContractCallExtensionPageOpen(false);
      },
    });
    setIsContractCallExtensionPageOpen(true);
  };
}
