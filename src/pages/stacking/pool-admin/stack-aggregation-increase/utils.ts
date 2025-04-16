import { Dispatch, SetStateAction } from 'react';

import { ContractCallRegularOptions, FinishedTxData, openContractCall } from '@stacks/connect';
import {
  Pox4SignatureTopic,
  PoxOperationInfo,
  StackingClient,
  verifyPox4SignatureHash,
} from '@stacks/stacking';
import * as yup from 'yup';

import { StacksNetworkContext } from '@hooks/use-stacks-network';
import { parseNumber, stxToMicroStxBigint } from '@utils/unit-convert';
import { createBtcAddressSchema } from '@utils/validators/btc-address-validator';
import { hexStringSchema } from '@utils/validators/hex-string-validator';

import { SignatureDataSchema } from '../../signer/generate-signature/types';
import { StackAggregationCommitFormValues as StackAggregationIncreaseFormValues } from './types';

interface CreateValidationSchemaArgs {
  /**
   * The name of the network the app is live on, e.g., mainnet or testnet.
   */
  network: StacksNetworkContext;
}
export function createValidationSchema({ network }: CreateValidationSchemaArgs) {
  return yup.object().shape({
    rewardCycleId: yup
      .number()
      .defined()
      .test(
        'matches-signature-reward-cycle',
        'Reward cycle does not match signature data',
        function (rewardCycle) {
          const signatureJSON = this.parent.signatureJSON;
          if (typeof signatureJSON !== 'string') return true;
          const signatureData = SignatureDataSchema.json().cast(signatureJSON);
          return parseInt(signatureData.rewardCycle, 10) === rewardCycle;
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
    signerKey: hexStringSchema().required(),
    signerSignature: hexStringSchema()
      .test(
        'matches-topic',
        'Signature was not generated for stack-aggregation-increase',
        function (_signature) {
          const signatureJSON = this.parent.signatureJSON;
          if (typeof signatureJSON !== 'string') return true;
          const signatureData = SignatureDataSchema.json().cast(signatureJSON);
          return signatureData.method === 'agg-increase';
        }
      )
      .test('valid-signature', 'Unable to validate signature', function (signerSignature, context) {
        if (typeof signerSignature !== 'string') return true;
        const signatureVerificationOptions = {
          topic: 'agg-increase' as Pox4SignatureTopic,
          rewardCycle: context.parent.rewardCycleId,
          poxAddress: context.parent.poxAddress,
          authId: context.parent.authId,
          network: network.network,
          publicKey: context.parent.signerKey,
          signature: signerSignature,
          period: 1,
          maxAmount: stxToMicroStxBigint(context.parent.maxAmount),
        };
        const isValid = verifyPox4SignatureHash(signatureVerificationOptions);
        return isValid;
      }),
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
    signatureJSON: yup.string(),
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
  poxOperationInfo: PoxOperationInfo;
  setIsContractCallExtensionPageOpen: Dispatch<SetStateAction<boolean>>;
  setTxResult: Dispatch<SetStateAction<FinishedTxData | undefined>>;
}
export function createHandleSubmit({
  client,
  poxOperationInfo,
  setIsContractCallExtensionPageOpen,
  setTxResult,
}: CreateHandleSubmitArgs) {
  return async function handleSubmit(values: StackAggregationIncreaseFormValues) {
    // TODO: handle thrown errors
    const [stackingContract] = await Promise.all([client.getStackingContract()]);
    const withSignerKey = poxOperationInfo.current === poxOperationInfo.pox4;
    const authId = parseInt(values.authId, 10);
    const maxAmount = stxToMicroStxBigint(values.maxAmount);
    if (typeof values.signerSignature === 'string') {
      const isValid = verifyPox4SignatureHash({
        topic: 'agg-increase',
        poxAddress: values.poxAddress,
        rewardCycle: values.rewardCycleId,
        authId,
        maxAmount,
        period: 1,
        network: client.network,
        publicKey: values.signerKey,
        signature: values.signerSignature,
      });
      if (!isValid) {
        console.warn('Unable to verify signature.');
      } else {
        console.log('Signature is valid');
      }
    }
    const stackAggregationIncreaseOptions = client.getStackAggregationIncreaseOptions({
      contract: stackingContract,
      poxAddress: values.poxAddress,
      rewardCycle: values.rewardCycleId,
      rewardCycleIndex: values.rewardCycleIndex,
      signerKey: withSignerKey ? values.signerKey : undefined,
      signerSignature: withSignerKey ? values.signerSignature : undefined,
      maxAmount,
      authId,
    });

    openContractCall({
      // Type coercion necessary because the `network` property returned by
      // `client.getStackingContract()` has a wider type than allowed by `openContractCall`. Despite
      // the wider type, the actual value of `network` is always of the type `StacksNetwork`
      // expected by `openContractCall`.
      //
      // See
      // https://github.com/hirosystems/stacks.js/blob/0e1f9f19dfa45788236c9e481f9a476d9948d86d/packages/stacking/src/index.ts#L1054
      ...(stackAggregationIncreaseOptions as ContractCallRegularOptions),
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
