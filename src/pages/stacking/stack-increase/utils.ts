import { NavigateFunction } from 'react-router-dom';

import { ContractCallRegularOptions, showContractCall } from '@stacks/connect';
import {
  ExtendedAccountBalances,
  Pox4SignatureTopic,
  StackerInfo,
  StackingClient,
  verifyPox4SignatureHash,
} from '@stacks/stacking';
import BigNumber from 'bignumber.js';
import * as yup from 'yup';

import routes from '@constants/routes';
import { StacksNetworkContext } from '@hooks/use-stacks-network';
import { validateDecimalPrecision } from '@utils/form/validate-decimals';
import { formatPoxAddressToNetwork } from '@utils/stacking';
import { stxToMicroStx, stxToMicroStxBigint } from '@utils/unit-convert';
import { hexStringSchema } from '@utils/validators/hex-string-validator';
import { stxAmountSchema } from '@utils/validators/stx-amount-validator';
import { stxBalanceValidator } from '@utils/validators/stx-balance-validator';

import { StackIncreaseInfo } from '../direct-stacking-info/get-has-pending-stack-increase';
import { SignerDetailsFormValues } from '../pool-admin/stack-aggregation-commit/types';
import { SignatureDataSchema } from '../signer/generate-signature/types';

export interface EditingFormValues extends SignerDetailsFormValues {
  increaseBy: BigNumber;
}

interface CreateValidationSchemaArgs {
  /**
   * Available unlocked balance of the current account. Used to ensure users don't try to stack more than is available.
   */
  availableBalanceUStx: BigNumber;

  /**
   * The stacking transaction's estimated fee. Used to ensure the account has enough STX available to both stack the desired amount and pay for the stacking transaction fee.
   */
  transactionFeeUStx: bigint;

  /**
   * Current stacker info
   */
  stackerInfo: StackerInfo;
  /**
   * The Stacks network context returned from `useStacksNetwork`.
   */
  network: StacksNetworkContext;

  /**
   * The current reward cycle
   */
  rewardCycleId: number;
}

export function createValidationSchema({
  availableBalanceUStx,
  transactionFeeUStx,
  network,
  rewardCycleId,
  stackerInfo,
}: CreateValidationSchemaArgs) {
  if (!stackerInfo.stacked) {
    throw new Error('User is not stacked - cannot increase');
  }
  const lockPeriod = stackerInfo.details.lock_period;
  return yup.object().shape({
    increaseBy: stxAmountSchema()
      .test(stxBalanceValidator(BigInt(availableBalanceUStx.toString())))
      .test('test-precision', 'You cannot stack with a precision of less than 1 STX', value => {
        // If `undefined`, throws `required` error
        if (value === undefined) return true;
        return validateDecimalPrecision(0)(value);
      })
      .test({
        name: 'test-fee-margin',
        message: 'You must stack less than your entire balance to allow for the transaction fee',
        test: value => {
          if (value === null || value === undefined) return false;
          const uStxInput = stxToMicroStx(value);
          return !uStxInput.isGreaterThan(
            new BigNumber(availableBalanceUStx.toString()).minus(transactionFeeUStx.toString())
          );
        },
      }),
    signerSignature: hexStringSchema()
      .test('matches-topic', 'Signature was not generated for stack-stx', function (_signature) {
        const signatureJSON = this.parent.signatureJSON;
        if (typeof signatureJSON !== 'string') return true;
        const signatureData = SignatureDataSchema.json().cast(signatureJSON);
        return signatureData.method === 'stack-increase';
      })
      .test(
        'matches-lock-period',
        `"Period" argument when generating signature must match current lock period (${lockPeriod})`,
        function (_signature) {
          const signatureJSON = this.parent.signatureJSON;
          if (typeof signatureJSON !== 'string') return true;
          const signatureData = SignatureDataSchema.json().cast(signatureJSON);
          if (parseInt(signatureData.period, 10) !== stackerInfo.details.lock_period) {
            return this.createError({
              message: `"Period" argument when generating signature was ${signatureData.period}, but it must match current lock period (${lockPeriod})`,
              path: 'signerSignature',
            });
          }
          return true;
        }
      )
      .test('valid-signature', 'Unable to validate signature', function (signerSignature, context) {
        const signatureJSON = context.parent.signatureJSON;
        if (typeof signatureJSON !== 'string') return true;
        if (typeof signerSignature !== 'string') return true;
        const signatureData = SignatureDataSchema.json().cast(signatureJSON);
        const poxAddress = formatPoxAddressToNetwork(
          network.network,
          stackerInfo.details.pox_address
        );
        const signatureVerificationOptions = {
          topic: 'stack-increase' as Pox4SignatureTopic,
          rewardCycle: parseInt(signatureData.rewardCycle, 10),
          poxAddress: poxAddress,
          authId: context.parent.authId,
          network: network.network,
          publicKey: context.parent.signerKey,
          signature: signerSignature,
          period: stackerInfo.details.lock_period,
          maxAmount: stxToMicroStxBigint(context.parent.maxAmount),
        };
        const isValid = verifyPox4SignatureHash(signatureVerificationOptions);
        return isValid;
      })
      .test(
        'matches-reward-cycle',
        'Signature is not valid for current reward cycle',
        function (signerSignature, context) {
          const signatureJSON = context.parent.signatureJSON;
          if (typeof signatureJSON !== 'string') return true;
          if (typeof signerSignature !== 'string') return true;
          const signatureData = SignatureDataSchema.json().cast(signatureJSON);
          return parseInt(signatureData.rewardCycle, 10) === rewardCycleId;
        }
      ),
  });
}

interface CreateHandleSubmitArgs {
  client: StackingClient;
  navigate: NavigateFunction;
  setIsContractCallExtensionPageOpen: React.Dispatch<React.SetStateAction<boolean>>;
}
export function createHandleSubmit({
  client,
  navigate,
  setIsContractCallExtensionPageOpen,
}: CreateHandleSubmitArgs) {
  return async ({
    increaseBy,
    signerKey,
    signerSignature,
    maxAmount: maxAmountStr,
    authId,
  }: EditingFormValues) => {
    if (!client) return;
    const maxAmount = stxToMicroStxBigint(maxAmountStr);
    const stackingContract = await client.getStackingContract();
    const stackIncreaseOptions = client.getStackIncreaseOptions({
      contract: stackingContract,
      increaseBy: stxToMicroStx(increaseBy).toString(),
      signerKey,
      signerSignature,
      maxAmount,
      authId: parseInt(authId),
    });
    setIsContractCallExtensionPageOpen(true);
    showContractCall({
      // Type coercion necessary because the `network` property returned by
      // `client.getStackingContract()` has a wider type than allowed by `showContractCall`. Despite
      // the wider type, the actual value of `network` is always of the type `StacksNetwork`
      // expected by `showContractCall`.
      //
      // See
      // https://github.com/hirosystems/stacks.js/blob/0e1f9f19dfa45788236c9e481f9a476d9948d86d/packages/stacking/src/index.ts#L1054
      ...(stackIncreaseOptions as ContractCallRegularOptions),
      onCancel() {
        setIsContractCallExtensionPageOpen(false);
      },
      onFinish() {
        setIsContractCallExtensionPageOpen(false);
        navigate(routes.DIRECT_STACKING_INFO);
      },
    });
  };
}

export function getAvailableAmountUstx(
  extendedStxBalances: ExtendedAccountBalances['stx'],
  stackIncreaseInfo: StackIncreaseInfo | undefined | null
) {
  return new BigNumber(extendedStxBalances.balance.toString())
    .minus(new BigNumber(extendedStxBalances.locked.toString()))
    .minus(new BigNumber(stackIncreaseInfo ? stackIncreaseInfo.increaseBy.toString() : 0));
}
