import React from 'react';

import { SignatureData } from '@stacks/connect';
import { Box, Flex, Text, color, useClipboard } from '@stacks/ui';
import { IconCopy } from '@tabler/icons-react';
import { useFormikContext } from 'formik';

import { Hr } from '@components/hr';
import {
  InfoCardGroup as Group,
  InfoCard,
  InfoCardLabel as Label,
  InfoCardRow as Row,
  InfoCardSection as Section,
  InfoCardValue as Value,
} from '@components/info-card';
import { Screen } from '@components/screen';
import { useGetPoxInfoQuery } from '@components/stacking-client-provider/stacking-client-provider';
import { Title } from '@components/title';
import { truncateMiddle } from '@utils/tx-utils';

import { ConfirmAndSubmit } from '../../../components/confirm-and-submit';
import { StackingFormContainer } from '../../../components/stacking-form-container';
import { StackingFormInfoPanel } from '../../../components/stacking-form-info-panel';
import { Duration } from '../../../pool-admin/components/choose-duration';
import { RewardCycle } from '../../../pool-admin/components/choose-reward-cycle';
import { PoxAddress } from '../../../start-direct-stacking/components/pox-address/pox-address';
import { GenerateSignatureFields, MAX_U128 } from '../types';
import { AuthId } from './auth-id';
import { MaxAmount } from './max-amount';
import { SignatureSection } from './signature-section';
import { Topic } from './topic';

export function GenerateSignatureLayout({
  signatureData,
}: {
  signatureData: SignatureData | null;
}) {
  const { poxAddress, topic, period, rewardCycleId, authId, maxAmount } =
    useFormikContext<GenerateSignatureFields>().values;
  const getPoxInfoQuery = useGetPoxInfoQuery();
  const { onCopy } = useClipboard(
    signatureData ? JSON.stringify({ ...signatureData, maxAmount, authId }) : ''
  );

  return (
    <Screen pt="80px" mb="extra-loose">
      <Flex
        flexDirection={['column-reverse', 'column-reverse', 'row']}
        justifyContent="space-between"
      >
        <Box maxWidth={[null, null, '544px']} mr={[null, null, 'extra-loose']}>
          <Title>Generate a signer key signature</Title>
          <Text textStyle="body.large" display="block" color={color('text-caption')} mt={4}>
            When making certain Stacking transactions, it&apos;s required that you provide a
            signature and other information to ensure that the signer you&apos;re using is
            authorizing the transaction.
          </Text>
          <StackingFormContainer>
            <RewardCycle />
            <PoxAddress
              description={
                'Enter the bitcoin address you use for stacking or the bitcoin address of a stacker using your signing service.'
              }
            />
            <Topic />
            <MaxAmount />
            <AuthId />
            <Duration fieldName="period" />
            <ConfirmAndSubmit isLoading={false} title="Submit" actionLabel="Generate Signature" />
            {/* {signatureData !== null ? (
              <Box>
                <Text fontFamily={'monospace'}>Signature: 0x{signatureData.signature}</Text>
                <Text fontFamily={'monospace'}>Public Key: 0x{signatureData.publicKey}</Text>
              </Box>
            ) : null} */}
          </StackingFormContainer>
        </Box>
        <Box>
          <StackingFormInfoPanel>
            <InfoCard minHeight="84px">
              <Box mx={['loose', 'extra-loose']} maxWidth={[null, null, '400px']}>
                <Flex flexDirection="column" pt="extra-loose" pb="base-loose">
                  <Text textStyle="body.large.medium">Signature details</Text>
                  <Text
                    fontSize="24px"
                    mt="extra-tight"
                    fontWeight={500}
                    fontFamily="Open Sauce"
                    letterSpacing="-0.02em"
                  >
                    {/* {createAmountText(amount ?? 0)} */}
                  </Text>
                </Flex>
                <Hr />
                <Group width="100%" mt="base-loose" mb="extra-loose">
                  <Section>
                    <Row>
                      <Label>Reward Cycle</Label>
                      <Value>{rewardCycleId}</Value>
                    </Row>
                    <Row>
                      <Label>Current cycle</Label>
                      <Value>{getPoxInfoQuery.data?.current_cycle.id}</Value>
                    </Row>
                  </Section>
                  <Section>
                    <Row>
                      <Label>Topic</Label>
                      <Value>
                        <Text fontFamily={'monospace'}>{topic}</Text>
                      </Value>
                    </Row>
                  </Section>

                  <Section>
                    <Row>
                      <Label
                      // explainer={`One cycle lasts ${getPoxInfoQuery.data?.reward_cycle_length} blocks on the Bitcoin blockchain`}
                      >
                        Cycles
                      </Label>
                      <Value>{period}</Value>
                    </Row>
                  </Section>

                  <Section>
                    <Row>
                      <Label>Bitcoin address</Label>
                      <Value>{poxAddress ? truncateMiddle(poxAddress) : '—'}</Value>
                    </Row>
                  </Section>

                  <Section>
                    <Row>
                      <Label explainer="The maximum amount of STX that can be locked while using this signature">
                        Max Amount
                      </Label>
                      <Value>
                        <Text textStyle="caption" overflowWrap="anywhere" fontFamily={'monospace'}>
                          {BigInt(maxAmount) === MAX_U128 ? 'MAX' : maxAmount}
                        </Text>
                      </Value>
                    </Row>
                  </Section>

                  <Section>
                    <Row>
                      <Label>Auth ID</Label>
                      <Value>
                        <Text textStyle="caption" overflowWrap="anywhere" fontFamily={'monospace'}>
                          {authId}
                        </Text>
                      </Value>
                    </Row>
                  </Section>

                  <>
                    {signatureData === null ? null : (
                      <>
                        <Section>
                          <Row>
                            <Label>Signer Details to share with Stackers</Label>

                            <Box display="inline-block" cursor="pointer" ml="5px" onClick={onCopy}>
                              <IconCopy size={16} />
                            </Box>
                          </Row>
                        </Section>
                        <SignatureSection signatureData={{ ...signatureData, maxAmount, authId }} />
                      </>
                    )}
                  </>
                </Group>
              </Box>
            </InfoCard>
          </StackingFormInfoPanel>
        </Box>
      </Flex>
    </Screen>
  );
}
