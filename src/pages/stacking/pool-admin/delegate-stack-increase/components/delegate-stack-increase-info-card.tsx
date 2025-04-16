import { IntegerType, intToBigInt } from '@stacks/common';
import { StackingClient } from '@stacks/stacking';
import { validateStacksAddress } from '@stacks/transactions';
import { useFormikContext } from 'formik';
import { Box, Flex, styled } from 'leather-styles/jsx';
import { createAmountText } from 'src/pages/stacking/utils/create-amount-text';

import { Address } from '@components/address';
import { Hr } from '@components/hr';
import {
  InfoCardGroup as Group,
  InfoCard,
  InfoCardLabel as Label,
  InfoCardRow as Row,
  InfoCardSection as Section,
  InfoCardValue as Value,
} from '@components/info-card';
import { useGetAccountExtendedBalancesWithClientQuery } from '@components/stacking-client-provider/stacking-client-provider';
import { useStacksNetwork } from '@hooks/use-stacks-network';
import { truncateMiddle } from '@utils/tx-utils';
import { toHumanReadableStx } from '@utils/unit-convert';

import { DelegateStackIncreaseFormValues } from '../types';
import { fetchFn } from '@components/stacking-client-provider/fetch-fn';

function StackerIncreaseInfo({ stacker, amount }: { stacker: string; amount: string }) {
  return (
    <>
      <styled.p>You&apos;ll lock</styled.p>
      <styled.p fontSize="24px" mt="extra-tight" fontWeight={500}>
        {createAmountText(amount ?? 0)} for
      </styled.p>
      <Address address={stacker} />
    </>
  );
}

export function StackerDuration({ stacker }: { stacker: string }) {
  const { network } = useStacksNetwork();
  const client = new StackingClient({ address: stacker, network, client: { fetch: fetchFn } });
  const getAccountExtendedBalancesQuery = useGetAccountExtendedBalancesWithClientQuery(client);

  let lockedAmount: bigint | null = null;
  if (!getAccountExtendedBalancesQuery.isError && getAccountExtendedBalancesQuery.data?.stx) {
    lockedAmount = intToBigInt(getAccountExtendedBalancesQuery.data.stx.locked);
  }
  if (lockedAmount === null || lockedAmount === 0n) {
    return (
      <>
        <styled.p>Pool member must be locked first.</styled.p>
        <styled.p>Locked amount: 0 STX</styled.p>
        <Address address={stacker} />
      </>
    );
  }
}

function IncreaseByValue({ stacker, amount }: { stacker: string; amount: IntegerType }) {
  const { network } = useStacksNetwork();
  const client = new StackingClient({
    address: stacker,
    network,
    client: { fetch: fetchFn },
  });
  const getAccountExtendedBalancesQuery = useGetAccountExtendedBalancesWithClientQuery(client);
  if (getAccountExtendedBalancesQuery.isError || !getAccountExtendedBalancesQuery.data) {
    return <Value>0 STX</Value>;
  }
  const increaseBy =
    intToBigInt(amount) * 1_000_000n - intToBigInt(getAccountExtendedBalancesQuery.data.stx.locked);
  return <Value>{toHumanReadableStx(increaseBy > 0n ? increaseBy : 0n)}</Value>;
}

export function InfoPanel() {
  const f = useFormikContext<DelegateStackIncreaseFormValues>();

  const { stacker, amount, poxAddress } = f.values;
  // TODO;
  const isValidStacker =
    stacker && validateStacksAddress(stacker) && f.errors.stacker === undefined;

  return (
    <InfoCard minHeight="84px">
      <Box mx={['loose', 'extra-loose']}>
        <Flex flexDirection="column" pt="extra-loose" pb="base-loose">
          {isValidStacker ? (
            <StackerIncreaseInfo stacker={stacker} amount={amount} />
          ) : (
            <styled.span>Choose pool member first!</styled.span>
          )}
        </Flex>
        <Hr />
        <Group width="100%" mt="base-loose" mb="extra-loose">
          <Section>
            <Row>
              <Label explainer={`Additional STX to be locked and use in the stacking transaction.`}>
                Increase by
              </Label>
              {isValidStacker ? (
                <IncreaseByValue stacker={stacker} amount={amount} />
              ) : (
                <Value>0 STX</Value>
              )}
            </Row>
          </Section>

          <Section>
            <Row>
              <Label>Pool PoX address</Label>
              <Value>{poxAddress ? truncateMiddle(poxAddress) : '—'}</Value>
            </Row>
          </Section>
        </Group>
      </Box>
    </InfoCard>
  );
}
