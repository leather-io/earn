import { Dispatch, SetStateAction } from 'react';

import { ContractCallRegularOptions, FinishedTxData, showContractCall } from '@stacks/connect';
import { PoxOperationInfo, StackingClient, verifyPox4SignatureHash } from '@stacks/stacking';
import * as yup from 'yup';

import { stxToMicroStxBigint } from '@utils/unit-convert';
import { createBtcAddressSchema } from '@utils/validators/btc-address-validator';
import { hexStringSchema } from '@utils/validators/hex-string-validator';

import { StackAggregationCommitFormValues } from './types';

interface CreateValidationSchemaArgs {
  /**
   * The name of the network the app is live on, e.g., mainnet or testnet.
   */
  network: string;
}
export function createValidationSchema({ network }: CreateValidationSchemaArgs) {
  return yup.object().shape({
    rewardCycleId: yup.number().defined(),
    poxAddress: createBtcAddressSchema({
      network,
    }),
    signerKey: hexStringSchema().required(),
    signerSignature: hexStringSchema(),
    maxAmount: yup.number().defined(),
    authId: yup.number().defined(),
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
  return async function handleSubmit(values: StackAggregationCommitFormValues) {
    // TODO: handle thrown errors
    const [stackingContract] = await Promise.all([client.getStackingContract()]);
    const withSignerKey = poxOperationInfo.current === poxOperationInfo.pox4;
    const authId = parseInt(values.authId, 10);
    const maxAmount = stxToMicroStxBigint(BigInt(values.maxAmount));
    if (typeof values.signerSignature === 'string') {
      const isValid = verifyPox4SignatureHash({
        topic: 'agg-commit',
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
    const stackAggregationCommitOptions = client.getStackAggregationCommitOptionsIndexed({
      contract: stackingContract,
      poxAddress: values.poxAddress,
      rewardCycle: values.rewardCycleId,
      signerKey: withSignerKey ? values.signerKey : undefined,
      signerSignature: withSignerKey ? values.signerSignature : undefined,
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
      ...(stackAggregationCommitOptions as ContractCallRegularOptions),
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
