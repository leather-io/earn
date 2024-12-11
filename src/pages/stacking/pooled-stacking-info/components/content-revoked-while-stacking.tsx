import { intToBigInt } from '@stacks/common';
import { ExtendedAccountBalances } from '@stacks/stacking';
import { Text } from '@stacks/ui';
import { IconInfoCircle } from '@tabler/icons-react';

import { Address } from '@components/address';
import { Alert } from '@components/alert';
import { Hr } from '@components/hr';
import {
  InfoCardGroup as Group,
  InfoCardLabel as Label,
  InfoCardRow as Row,
  InfoCardSection as Section,
  InfoCardValue as Value,
} from '@components/info-card';
import { Link } from '@components/link';
import { toHumanReadableStx } from '@utils/unit-convert';

import { PercentageRow } from './percentage-row';

interface RevokedWhileStackingContentProps {
  extendedStxBalances: ExtendedAccountBalances['stx'];
  poolAddress: string;
}
export function RevokedWhileStackingContent({
  extendedStxBalances,
  poolAddress,
}: RevokedWhileStackingContentProps) {
  return (
    <>
      <Text textStyle="display.large">You&apos;re pooling</Text>
      <Text fontSize="24px" fontWeight={500} mt="extra-tight" my="extra-loose">
        {toHumanReadableStx(intToBigInt(extendedStxBalances.locked))}
      </Text>

      <Hr />

      <Group my="extra-loose">
        <Section>
          <Row>
            <Label>Status</Label>
            <Value color={'green'}>Active</Value>
          </Row>
          <PercentageRow extendedStxBalances={extendedStxBalances} />
        </Section>

        {poolAddress && (
          <Section>
            <Row>
              <Label>Pool address</Label>
              <Value>
                <Address address={poolAddress} />
              </Value>
            </Row>
          </Section>
        )}

        <Section>
          <Alert icon={<IconInfoCircle />}>
            You&apos;ve revoked the pool&apos;s delegation. You may want to{' '}
            <Link display="inline" to="../start-pooled-stacking" color="ink.text-primary">
              start pooling
            </Link>{' '}
            again or{' '}
            <Link display="inline" to="../choose-stacking-method" color="ink.text-primary">
              choose a different stacking method
            </Link>
            .
          </Alert>
        </Section>
      </Group>
    </>
  );
}
