import { Box, FlexProps } from '@stacks/ui';
import { useFormikContext } from 'formik';

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
import { useGetPoxInfoQuery } from '@components/stacking-client-provider/stacking-client-provider';
import { useStacksNetwork } from '@hooks/use-stacks-network';
import { makeExplorerTxLink } from '@utils/external-links';
import { truncateMiddle } from '@utils/tx-utils';

import { createAmountText } from '../../utils/create-amount-text';
import { EditingFormValues } from '../types';
import { getPoxWrapperContract2 } from '../utils-preset-protocols';
import { LiquidStackingAmountInfo } from './liquid-stacking-amount-info';
import { protocols } from './preset-protocols';

export function ProtocolInfoCard(props: FlexProps) {
  const f = useFormikContext<EditingFormValues>();
  const poxInfoQuery = useGetPoxInfoQuery();
  const { networkName, networkInstance } = useStacksNetwork();

  const amount = f.values.amount;
  const protocolName = f.values.protocolName;
  const protocol = protocolName ? protocols[protocolName] : undefined;
  const protocolStxAddress =
    (protocol?.protocolAddress ? protocol.protocolAddress[networkInstance] : undefined) ||
    f.values.protocolAddress;
  const poxWrapperContract =
    (protocol?.poxContract
      ? getPoxWrapperContract2(networkInstance, protocol.poxContract)
      : undefined) || poxInfoQuery.data?.contract_id;

  const amountText = createAmountText(amount);

  return (
    <>
      <InfoCard {...props}>
        <Box mx={['loose', 'extra-loose']} sx={{}}>
          <LiquidStackingAmountInfo title="You'll liquid stack up to" amountText={amountText} />

          <Hr />

          <Group mt="base-loose" mb="extra-loose">
            <Section>
              <Row>
                <Label explainer="How long you will liquid stack with the protocol. By default, any liquid stacking protocol will stack your STX indefinitely until you decide to unstack.">
                  Duration
                </Label>
                <Value>Indefinite</Value>
              </Row>
            </Section>

            <Section>
              <Row>
                <Label explainer="This address is provided to you by your chosen protocol for liquid stacking specifically.">
                  Liquid Stacking address
                </Label>
                <Value>{protocolStxAddress ? truncateMiddle(protocolStxAddress) : '—'}</Value>
              </Row>
              <Row>
                <Label>Contract</Label>
                <Value>
                  {poxWrapperContract && (
                    <OpenExternalLinkInNewTab
                      href={makeExplorerTxLink(poxWrapperContract, networkName)}
                    >
                      {truncateMiddle(poxWrapperContract)}
                    </OpenExternalLinkInNewTab>
                  )}
                </Value>
              </Row>
            </Section>
          </Group>
        </Box>
      </InfoCard>
    </>
  );
}
