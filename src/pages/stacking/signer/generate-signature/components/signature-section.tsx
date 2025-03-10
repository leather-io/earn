import { styled } from 'leather-styles/jsx';
import { Flex } from 'leather-styles/jsx';

import {
  InfoCardLabel as Label,
  InfoCardRow as Row,
  InfoCardSection as Section,
  InfoCardValue as Value,
} from '@components/info-card';
import { SignMessageResult } from '@hooks/use-generate-signature';

import { MAX_U128 } from '../types';

interface Props {
  signatureData: (SignMessageResult & { maxAmount: string; authId: string }) | undefined;
}

export function SignatureSection({ signatureData }: Props) {
  return (
    <>
      <Section>
        <Row>
          <Label>
            <Flex alignItems={'center'} justifyContent={'center'}>
              <styled.p>Public Key</styled.p>
            </Flex>
          </Label>
        </Row>
        <Row>
          <Value>
            <styled.p color="ink.text-subdued" overflowWrap="anywhere" fontFamily={'monospace'}>
              {signatureData ? `0x${signatureData.publicKey}` : '—'}
            </styled.p>
          </Value>
        </Row>
      </Section>
      <Section>
        <Row>
          <Label>
            <Flex alignItems={'center'} justifyContent={'center'}>
              <styled.p>Signature</styled.p>
            </Flex>
          </Label>
        </Row>
        <Row>
          <Value>
            <styled.p color="ink.text-subdued" overflowWrap={'anywhere'} fontFamily={'monospace'}>
              {signatureData ? `0x${signatureData.signature}` : '—'}
            </styled.p>
          </Value>
        </Row>
      </Section>
      <Section>
        <Row>
          <Label>Max Amount</Label>
          <Value>
            <styled.p color="ink.text-subdued" overflowWrap="anywhere" fontFamily={'monospace'}>
              {signatureData && signatureData.maxAmount
                ? signatureData.maxAmount === MAX_U128
                  ? 'MAX'
                  : signatureData.maxAmount
                : '—'}
            </styled.p>
          </Value>
        </Row>
      </Section>
      <Section>
        <Row>
          <Label>Auth ID</Label>
          <Value>
            <styled.p color="ink.text-subdued" overflowWrap="anywhere" fontFamily={'monospace'}>
              {signatureData ? signatureData.authId : '—'}
            </styled.p>
          </Value>
        </Row>
      </Section>
    </>
  );
}
