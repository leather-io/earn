import { intToBigInt } from '@stacks/common';
import { StackingClient } from '@stacks/stacking';
import { validateStacksAddress } from '@stacks/transactions';
import { useFormikContext } from 'formik';
import { Box, Flex, styled } from 'leather-styles/jsx';

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
import {
  useGetAccountExtendedBalancesWithClientQuery,
  useGetPoxInfoQuery,
} from '@components/stacking-client-provider/stacking-client-provider';
import { useStacksNetwork } from '@hooks/use-stacks-network';
import { truncateMiddle } from '@utils/tx-utils';
import { toHumanReadableStx } from '@utils/unit-convert';

import { DelegateStackExtendFormValues } from '../types';
import { fetchFn } from '@components/stacking-client-provider/fetch-fn';

function StackerExtendInfo({ stacker }: { stacker: string }) {
  const { network } = useStacksNetwork();
  const client = new StackingClient({ address: stacker, network, client: { fetch: fetchFn } });
  const getAccountExtendedBalancesQuery = useGetAccountExtendedBalancesWithClientQuery(client);

  let amount: bigint | null = null;
  if (!getAccountExtendedBalancesQuery.isError && getAccountExtendedBalancesQuery.data?.stx) {
    amount = intToBigInt(getAccountExtendedBalancesQuery.data.stx.locked);
  }
  if (amount === null || amount === 0n) {
    return (
      <>
        <styled.p>Pool member can&apos;t be extended</styled.p>
        <styled.p>Locked amount: 0 STX</styled.p>
        <Address address={stacker} />
      </>
    );
  }

  return (
    <>
      <styled.p>You&apos;ll extend locking of</styled.p>
      <styled.p fontSize="24px" mt="extra-tight" fontWeight={500}>
        {toHumanReadableStx(amount ?? 0)} for
      </styled.p>
      <Address address={stacker} />
    </>
  );
}

export function InfoPanel() {
  const f = useFormikContext<DelegateStackExtendFormValues>();
  const getPoxInfoQuery = useGetPoxInfoQuery();
  const { stacker, poxAddress, extendCount } = f.values;
  const isValidStacker =
    stacker && validateStacksAddress(stacker) && f.errors.stacker === undefined;
  return (
    <InfoCard minHeight="84px">
      <Box mx={['loose', 'extra-loose']}>
        <Flex flexDirection="column" pt="extra-loose" pb="base-loose">
          {isValidStacker ? (
            <StackerExtendInfo stacker={stacker} />
          ) : (
            <styled.p>Choose pool member first!</styled.p>
          )}
        </Flex>
        <Hr />
        <Group width="100%" mt="base-loose" mb="extra-loose">
          <Section>
            <Row>
              <Label
                explainer={`One cycle lasts ${getPoxInfoQuery.data?.reward_cycle_length} blocks on the Bitcoin blockchain`}
              >
                Cycles to be added
              </Label>
              <Value>{extendCount}</Value>
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
