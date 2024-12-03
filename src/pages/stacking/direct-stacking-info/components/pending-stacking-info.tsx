import { IconClockHour4 } from '@tabler/icons-react';
import { Box, Flex, styled } from 'leather-styles/jsx';

import { Address } from '@components/address';
import { Alert, AlertText } from '@components/alert';
import { OpenExternalLinkInNewTab } from '@components/external-link';
import { Hr } from '@components/hr';
import {
  InfoCardGroup as Group,
  InfoCard,
  InfoCardLabel as Label,
  InfoCardRow as Row,
  InfoCardSection as Section,
  InfoCardValue as Value,
} from '@components/info-card';
import { makeExplorerTxLink } from '@utils/external-links';
import { toHumanReadableStx } from '@utils/unit-convert';

import { ReturnGetHasPendingDirectStacking } from '../get-has-pending-direct-stacking';

interface Props {
  data: ReturnGetHasPendingDirectStacking;
  transactionId: string | undefined;
  networkName: string;
}
export function PendingStackingInfo({ data, transactionId, networkName }: Props) {
  return (
    <>
      <Flex height="100%" justify="center" align="center">
        <InfoCard width="420px">
          <Box mx={['space.04', 'space.06']}>
            <Flex flexDirection="column" pt="space.04" pb="space.04">
              <styled.h2 textStyle="heading.02">You&apos;re stacking</styled.h2>
              <styled.p
                textStyle="heading.02"
                fontSize="24px"
                fontWeight={500}
                letterSpacing="-0.02em"
              >
                {toHumanReadableStx(data.amountMicroStx)}
              </styled.p>

              <Box pb="space.04">
                <Alert icon={<IconClockHour4 />} title="Waiting for transaction confirmation">
                  <AlertText>
                    A stacking request was successfully submitted to the blockchain. Once confirmed,
                    the account will be ready to start stacking.
                  </AlertText>
                </Alert>
              </Box>

              <Hr />

              <Group mt="space.04">
                <Section>
                  <Row>
                    <Label>Duration</Label>
                    <Value>{data.lockPeriod.toString()} cycles</Value>
                  </Row>
                  <Row>
                    <Label>Bitcoin address</Label>
                    <Value>
                      <Address address={data.poxAddress} />
                    </Value>
                  </Row>
                </Section>
                <Section>
                  <Row>
                    {transactionId && (
                      <OpenExternalLinkInNewTab
                        href={makeExplorerTxLink(transactionId, networkName)}
                      >
                        View transaction
                      </OpenExternalLinkInNewTab>
                    )}
                  </Row>
                </Section>
              </Group>
            </Flex>
          </Box>
        </InfoCard>
      </Flex>
    </>
  );
}
