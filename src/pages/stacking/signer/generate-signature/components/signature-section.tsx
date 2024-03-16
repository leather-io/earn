import { SignatureData } from '@stacks/connect';
import { Flex, Text } from '@stacks/ui';

import {
  InfoCardLabel as Label,
  InfoCardRow as Row,
  InfoCardSection as Section,
  InfoCardValue as Value,
} from '@components/info-card';

import { MAX_U128 } from '../types';

interface Props {
  signatureData: (SignatureData & { maxAmount: string; authId: string }) | undefined;
}

export function SignatureSection({ signatureData }: Props) {
  return (
    <>
      <Section>
        <Row>
          <Label>
            <Flex alignItems={'center'} justifyContent={'center'}>
              <Text>Public Key</Text>
            </Flex>
          </Label>
        </Row>
        <Row>
          <Value>
            <Text textStyle="caption" overflowWrap="anywhere" fontFamily={'monospace'}>
              {signatureData ? `0x${signatureData.publicKey}` : '—'}
            </Text>
          </Value>
        </Row>
      </Section>
      <Section>
        <Row>
          <Label>
            <Flex alignItems={'center'} justifyContent={'center'}>
              <Text>Signature</Text>
            </Flex>
          </Label>
        </Row>
        <Row>
          <Value>
            <Text textStyle="caption" overflowWrap={'anywhere'} fontFamily={'monospace'}>
              {signatureData ? `0x${signatureData.signature}` : '—'}
            </Text>
          </Value>
        </Row>
      </Section>
      <Section>
        <Row>
          <Label>Max Amount</Label>
          <Value>
            <Text textStyle="caption" overflowWrap="anywhere" fontFamily={'monospace'}>
              {signatureData && signatureData.maxAmount
                ? BigInt(signatureData.maxAmount) === MAX_U128
                  ? 'MAX'
                  : signatureData.maxAmount
                : '—'}
            </Text>
          </Value>
        </Row>
      </Section>
      <Section>
        <Row>
          <Label>Auth ID</Label>
          <Value>
            <Text textStyle="caption" overflowWrap="anywhere" fontFamily={'monospace'}>
              {signatureData ? signatureData.authId : '—'}
            </Text>
          </Value>
        </Row>
      </Section>
    </>
  );
}
