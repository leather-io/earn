import { useFormikContext } from 'formik';
import { Box } from 'leather-styles/jsx';
import { styled } from 'leather-styles/jsx';
import { Flex } from 'leather-styles/jsx';

import { Hr } from '@components/hr';
import {
  InfoCardGroup as Group,
  InfoCard,
  InfoCardLabel as Label,
  InfoCardRow as Row,
  InfoCardSection as Section,
  InfoCardValue as Value,
} from '@components/info-card';
import { truncateMiddle } from '@utils/tx-utils';

import { SignatureSection } from '../../../signer/generate-signature/components/signature-section';
import { StackAggregationCommitFormValues } from '../types';

export function InfoPanel() {
  const f = useFormikContext<StackAggregationCommitFormValues>();

  const { rewardCycleId, poxAddress, signerKey, signerSignature, maxAmount, authId } = f.values;

  return (
    <InfoCard minHeight="84px">
      <Box mx={['loose', 'extra-loose']}>
        <Flex flexDirection="column" pt="extra-loose" pb="base-loose">
          <styled.p>You&apos;ll finalize</styled.p>
          <styled.p fontSize="24px" mt="extra-tight" fontWeight={500}>
            Cycle {rewardCycleId}
          </styled.p>
        </Flex>
        <Hr />
        <Group width="100%" mt="base-loose" mb="extra-loose">
          <Section>
            <Row>
              <Label>Pool PoX address</Label>
              <Value>{poxAddress ? truncateMiddle(poxAddress) : '—'}</Value>
            </Row>
          </Section>
          <SignatureSection
            signatureData={
              signerSignature && signerKey
                ? { signature: signerSignature, publicKey: signerKey, maxAmount, authId }
                : undefined
            }
          />
        </Group>
      </Box>
    </InfoCard>
  );
}
