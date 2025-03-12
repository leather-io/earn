import { useCallback, useState } from 'react';

import { IntegerType } from '@stacks/common';
import { MethodResult, request } from '@stacks/connect';
import {
  Pox4SignatureTopic,
  pox4SignatureMessage,
  verifyPox4SignatureHash,
} from '@stacks/stacking';

import { useStackingClient } from '@components/stacking-client-provider/stacking-client-provider';

import { useStacksNetwork } from './use-stacks-network';

export interface GenerateSignatureOptions {
  rewardCycle: number;
  poxAddress: string;
  period: number;
  topic: Pox4SignatureTopic;
  maxAmount: IntegerType;
  authId: IntegerType;
}

export type SignMessageResult = MethodResult<'stx_signStructuredMessage'>;

export function useGenerateStackingSignature() {
  const _stackingClient = useStackingClient();
  const [signatureData, setSignatureData] = useState<SignMessageResult | null>(null);
  const network = useStacksNetwork();
  const openSignatureRequest = useCallback(
    async (options: GenerateSignatureOptions) => {
      const { message, domain } = pox4SignatureMessage({
        topic: options.topic,
        period: options.period,
        network: network.network,
        rewardCycle: options.rewardCycle,
        poxAddress: options.poxAddress,
        maxAmount: options.maxAmount,
        authId: options.authId,
      });

      const data = await request('stx_signStructuredMessage', { message, domain });
      console.log('signature done', data);
      const isValid = verifyPox4SignatureHash({
        topic: options.topic,
        period: options.period,
        network: network.network,
        rewardCycle: options.rewardCycle,
        poxAddress: options.poxAddress,
        signature: data.signature,
        publicKey: data.publicKey,
        maxAmount: options.maxAmount,
        authId: options.authId,
      });
      console.log(isValid);
      setSignatureData(data);
    },
    [network.network]
  );

  return {
    openSignatureRequest,
    signatureData,
  };
}
