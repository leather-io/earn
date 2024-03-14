import { SignatureData } from '@stacks/connect';
import { Box, Flex, Text, useClipboard } from '@stacks/ui';
import { IconCopy } from '@tabler/icons-react';

import {
  InfoCardLabel as Label,
  InfoCardRow as Row,
  InfoCardSection as Section,
  InfoCardValue as Value,
} from '@components/info-card';

interface Props {
  signatureData: SignatureData | undefined;
}

export function SignatureSection({ signatureData }: Props) {
  const { onCopy: onCopySig } = useClipboard(signatureData?.signature ?? '');
  const { onCopy: onCopyPubKey } = useClipboard(signatureData?.publicKey ?? '');
  return (
    <>
      <Section>
        <Row>
          <Label>
            <Flex alignItems={'center'} justifyContent={'center'}>
              <Text>Public Key</Text>
              {signatureData && (
                <Box display="inline-block" cursor="pointer" ml="5px" onClick={onCopyPubKey}>
                  <IconCopy size={16} />
                </Box>
              )}
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
              {signatureData && (
                <Box display="inline-block" cursor="pointer" ml="5px" onClick={onCopySig}>
                  <IconCopy size={16} />
                </Box>
              )}
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
    </>
  );
}
