import { StackerInfo } from '@stacks/stacking';
import { IconClockHour4 } from '@tabler/icons-react';
import { Box, styled } from 'leather-styles/jsx';
import { Flex } from 'leather-styles/jsx';

import { Address } from '@components/address';
import { Alert, AlertText } from '@components/alert';
import { Hr } from '@components/hr';
import {
  InfoCardGroup as Group,
  InfoCard,
  InfoCardLabel as Label,
  InfoCardRow as Row,
  InfoCardSection as Section,
  InfoCardValue as Value,
} from '@components/info-card';
import { useStacksNetwork } from '@hooks/use-stacks-network';
import { formatPoxAddressToNetwork } from '@utils/stacking';
import { toHumanReadableStx } from '@utils/unit-convert';

import { PendingStackExtendAlert } from '../../components/pending-stack-extend-alert';
import { StackExtendInfo } from '../get-has-pending-stack-extend';
import { StackIncreaseInfo } from '../get-has-pending-stack-increase';
import { ActionButtonsRow } from './action-buttons-row';

type ActiveStackerInfo = StackerInfo & {
  stacked: true;
};

interface Props {
  lockedAmount: bigint;
  stackerInfoDetails: ActiveStackerInfo['details'];
  rewardCycleId: number;
  pendingStackIncrease: StackIncreaseInfo | undefined | null;
  pendingStackExtend: StackExtendInfo | undefined | null;
}

export function ActiveStackingInfo({
  lockedAmount,
  stackerInfoDetails: details,
  rewardCycleId,
  pendingStackExtend,
  pendingStackIncrease,
}: Props) {
  const { network } = useStacksNetwork();
  const elapsedCyclesSinceStackingStart = Math.max(rewardCycleId - details.first_reward_cycle, 0);
  const elapsedStackingCycles = Math.min(elapsedCyclesSinceStackingStart, details.lock_period);
  const isBeforeFirstRewardCycle = rewardCycleId < details.first_reward_cycle;
  const poxAddress = formatPoxAddressToNetwork(network, details.pox_address);

  return (
    <Flex height="100%" flexDirection="column" justify="center" align="center">
      <InfoCard width={['100%', '80%', '420px', '420px']} my="space.10">
        <Box mx="space.04">
          <Flex flexDirection="column" pt="space.06" pb="space.05">
            <styled.h2 textStyle="heading.01">You&apos;re stacking</styled.h2>
            <styled.p
              textStyle="heading.02"
              fontSize="24px"
              fontWeight={500}
              letterSpacing="-0.02em"
            >
              {toHumanReadableStx(lockedAmount)}
            </styled.p>

            {isBeforeFirstRewardCycle && (
              <Box pb="space.04">
                <Alert icon={<IconClockHour4 />} title="Waiting for the cycle to start">
                  Your STX are ready for stacking. Once the next cycle starts the network will
                  determine if and how many slots are claimed.
                </Alert>
              </Box>
            )}

            {pendingStackIncrease && (
              <Box pb="space.04">
                <Alert icon={<IconClockHour4 />} title="Waiting for transaction confirmation">
                  <AlertText>
                    A stacking request was successfully submitted to the blockchain. Once confirmed,
                    an additional amount of {toHumanReadableStx(pendingStackIncrease.increaseBy)}{' '}
                    will be stacking.
                  </AlertText>
                </Alert>
              </Box>
            )}

            {pendingStackExtend && (
              <PendingStackExtendAlert pendingStackExtend={pendingStackExtend} />
            )}

            <Hr />

            <Group pt="space.04">
              <Section>
                <Row>
                  <Label>Duration</Label>
                  <Value>
                    {elapsedStackingCycles} / {details.lock_period}
                  </Value>
                </Row>
                <Row>
                  <Label>Start</Label>
                  <Value>Cycle {details.first_reward_cycle}</Value>
                </Row>
                <Row>
                  <Label explainer="This is your last stacking cycle.">End</Label>
                  <Value>Cycle {details.first_reward_cycle + details.lock_period - 1} </Value>
                </Row>
                <Row>
                  <Label>Bitcoin address</Label>
                  <Address address={poxAddress} />
                </Row>
                <ActionButtonsRow />
              </Section>
            </Group>
          </Flex>
        </Box>
      </InfoCard>
    </Flex>
  );
}
