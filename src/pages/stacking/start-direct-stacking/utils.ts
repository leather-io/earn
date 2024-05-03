import { Dispatch, SetStateAction } from 'react';
import { NavigateFunction } from 'react-router-dom';

import { ContractCallRegularOptions, showContractCall } from '@stacks/connect';
import { Pox4SignatureTopic, StackingClient, verifyPox4SignatureHash } from '@stacks/stacking';
import BigNumber from 'bignumber.js';
import * as yup from 'yup';

// import { StacksMainnet, StacksTestnet } from '@stacks/network';
import { StacksNetworkContext } from '@hooks/use-stacks-network';
import { validateDecimalPrecision } from '@utils/form/validate-decimals';
import {
  parseNumber,
  stxToMicroStx,
  stxToMicroStxBigint,
  toHumanReadableStx,
} from '@utils/unit-convert';
import { createBtcAddressSchema } from '@utils/validators/btc-address-validator';
import { hexStringSchema } from '@utils/validators/hex-string-validator';
import { stxAmountSchema } from '@utils/validators/stx-amount-validator';
import { stxBalanceValidator } from '@utils/validators/stx-balance-validator';

import { SignatureDataSchema } from '../signer/generate-signature/types';
import { DirectStackingFormValues } from './types';

interface CreateValidationSchemaArgs {
  /**
   * Available balance of the current account. Used to ensure users don't try to stack more than is available.
   */
  availableBalanceUStx: bigint;

  /**
   * The stacking transaction's estimated fee. Used to ensure the account has enough STX available to both stack the desired amount and pay for the stacking transaction fee.
   */
  transactionFeeUStx: bigint;

  /**
   * The minimum stacking amount, in ustx, required by the PoX contract.
   */
  minimumAmountUStx: bigint;

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
  minimumAmountUStx,
  network,
  rewardCycleId,
}: CreateValidationSchemaArgs) {
  return yup.object().shape({
    amount: stxAmountSchema()
      .test(stxBalanceValidator(availableBalanceUStx))
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
      })
      .test({
        name: 'test-min-utx',
        message: `You must stack with at least ${toHumanReadableStx(minimumAmountUStx)}`,
        test: value => {
          if (value === null || value === undefined) return false;
          const uStxInput = stxToMicroStx(value);
          return new BigNumber(minimumAmountUStx.toString()).isLessThanOrEqualTo(uStxInput);
        },
      }),
    lockPeriod: yup
      .number()
      .defined()
      .test(
        'matches-period-pox-address',
        'Duration does not match signature data',
        function (lockPeriod) {
          const signatureJSON = this.parent.signatureJSON;
          if (typeof signatureJSON !== 'string') return true;
          const signatureData = SignatureDataSchema.json().cast(signatureJSON);
          return parseInt(signatureData.period, 10) === lockPeriod;
        }
      ),
    poxAddress: createBtcAddressSchema({
      network: network.networkName,
    }).test(
      'matches-signature-pox-address',
      'BTC Address does not match signature data',
      function (poxAddress) {
        const signatureJSON = this.parent.signatureJSON;
        if (typeof signatureJSON !== 'string') return true;
        const signatureData = SignatureDataSchema.json().cast(signatureJSON);
        return signatureData.poxAddress === poxAddress;
      }
    ),
    signatureJSON: yup.string(),
    signerKey: hexStringSchema().required(),
    signerSignature: hexStringSchema()
      .test('matches-topic', 'Signature was not generated for stack-stx', function (_signature) {
        const signatureJSON = this.parent.signatureJSON;
        if (typeof signatureJSON !== 'string') return true;
        const signatureData = SignatureDataSchema.json().cast(signatureJSON);
        return signatureData.method === 'stack-stx';
      })
      .test('valid-signature', 'Unable to validate signature', function (signerSignature, context) {
        const signatureJSON = context.parent.signatureJSON;
        if (typeof signatureJSON !== 'string') return true;
        if (typeof signerSignature !== 'string') return true;
        const signatureData = SignatureDataSchema.json().cast(signatureJSON);
        const signatureVerificationOptions = {
          topic: 'stack-stx' as Pox4SignatureTopic,
          rewardCycle: parseInt(signatureData.rewardCycle, 10),
          poxAddress: context.parent.poxAddress,
          authId: context.parent.authId,
          network: network.network,
          publicKey: context.parent.signerKey,
          signature: signerSignature,
          period: context.parent.lockPeriod,
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
    maxAmount: yup
      .string()
      .defined()
      .test(
        'matches-signature-max-amount',
        'Max amount does not match signature data',
        function (maxAmount) {
          const signatureJSON = this.parent.signatureJSON;
          if (typeof signatureJSON !== 'string') return true;
          const signatureData = SignatureDataSchema.json().cast(signatureJSON);
          return parseNumber(signatureData.maxAmount).isEqualTo(
            parseNumber(stxToMicroStxBigint(maxAmount))
          );
        }
      ),
    authId: yup
      .number()
      .defined()
      .test('matches-signature', 'Auth ID does not match signature data', function (authId) {
        const signatureJSON = this.parent.signatureJSON;
        if (typeof signatureJSON !== 'string') return true;
        const signatureData = SignatureDataSchema.json().cast(signatureJSON);
        return BigInt(signatureData.authId) === BigInt(authId);
      }),
  });
}

interface CreateHandleSubmitArgs {
  client: StackingClient;
  setIsContractCallExtensionPageOpen: Dispatch<SetStateAction<boolean>>;
  navigate: NavigateFunction;
}
export function createHandleSubmit({
  client,
  setIsContractCallExtensionPageOpen,
  navigate,
}: CreateHandleSubmitArgs) {
  return async function handleSubmit(values: DirectStackingFormValues) {
    if (values.amount === null) throw new Error('Expected a non-null amount to be submitted.');

    // TODO: handle thrown errors
    const [stackingContract, coreInfo] = await Promise.all([
      client.getStackingContract(),
      client.getPoxInfo(),
    ]);
    const currentHeight = coreInfo.current_burnchain_block_height;
    if (typeof currentHeight !== 'number') {
      throw new Error('Unable to get current block height.');
    }
    const authId = parseInt(values.authId, 10);
    const maxAmount = stxToMicroStxBigint(values.maxAmount);
    if (typeof values.signerSignature === 'string') {
      const isValid = verifyPox4SignatureHash({
        topic: 'stack-stx',
        poxAddress: values.poxAddress,
        rewardCycle: coreInfo.current_cycle.id,
        authId,
        maxAmount,
        period: values.lockPeriod,
        network: client.network,
        publicKey: values.signerKey,
        signature: values.signerSignature,
      });
      if (!isValid) {
        console.warn('⚠️ Unable to verify signature.');
      } else {
        console.log('✅ Signature verified');
      }
    }
    const stackOptions = client.getStackOptions({
      contract: stackingContract,
      amountMicroStx: stxToMicroStxBigint(values.amount),
      cycles: values.lockPeriod,
      poxAddress: values.poxAddress,
      // TODO
      burnBlockHeight: currentHeight,
      signerKey: values.signerKey,
      signerSignature: values.signerSignature,
      maxAmount,
      authId,
    });

    showContractCall({
      // Type coercion necessary because the `network` property returned by
      // `client.getStackingContract()` has a wider type than allowed by `showContractCall`. Despite
      // the wider type, the actual value of `network` is always of the type `StacksNetwork`
      // expected by `showContractCall`.
      //
      // See
      // https://github.com/hirosystems/stacks.js/blob/0e1f9f19dfa45788236c9e481f9a476d9948d86d/packages/stacking/src/index.ts#L1054
      ...(stackOptions as ContractCallRegularOptions),
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
