import { openStructuredDataSignatureRequestPopup, SignatureData } from '@stacks/connect';
import { useCallback, useState } from 'react';
import { useStacksNetwork } from './use-stacks-network';
import { useStackingClient } from '@components/stacking-client-provider/stacking-client-provider';
import {
  Pox4SignatureTopic,
  pox4SignatureMessage,
  verifyPox4SignatureHash,
} from '@stacks/stacking';

export interface GenerateSignatureOptions {
  rewardCycle: number;
  poxAddress: string;
  period: number;
  topic: Pox4SignatureTopic;
}

export function useGenerateStackingSignature() {
  const _stackingClient = useStackingClient();
  const [signatureData, setSignatureData] = useState<SignatureData | null>(null);
  const network = useStacksNetwork();
  const openSignatureRequest = useCallback(
    async (options: GenerateSignatureOptions) => {
      const { message, domain } = pox4SignatureMessage({
        topic: options.topic,
        period: options.period,
        network: network.network,
        rewardCycle: options.rewardCycle,
        poxAddress: options.poxAddress,
      });

      await openStructuredDataSignatureRequestPopup({
        domain,
        message,
        onFinish: data => {
          console.log('signature done', data);
          const isValid = verifyPox4SignatureHash({
            topic: options.topic,
            period: options.period,
            network: network.network,
            rewardCycle: options.rewardCycle,
            poxAddress: options.poxAddress,
            signature: data.signature,
            publicKey: data.publicKey,
          });
          console.log(isValid);
          setSignatureData(data);
        },
      });
    },
    [network.network, setSignatureData]
  );

  return {
    openSignatureRequest,
    signatureData,
  };
}
