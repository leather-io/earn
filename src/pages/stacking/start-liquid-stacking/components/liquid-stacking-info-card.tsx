import { Box, FlexProps } from 'leather-styles/jsx';
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
import { useStacksNetwork } from '@hooks/use-stacks-network';
import { makeExplorerTxLink } from '@utils/external-links';
import { truncateMiddle } from '@utils/tx-utils';

import { createAmountText } from '../../utils/create-amount-text';
import { EditingFormValues } from '../types';
import { LiquidStackingAmountInfo } from './liquid-stacking-amount-info';
import { protocols } from './preset-protocols';

export function ProtocolInfoCard(props: FlexProps) {
  const f = useFormikContext<EditingFormValues>();
  const { networkName, networkInstance } = useStacksNetwork();

  const amount = f.values.amount;
  const protocolName = f.values.protocolName;
  const protocol = protocolName ? protocols[protocolName] : undefined;
  const protocolStxAddress =
    (protocol?.protocolAddress ? protocol.protocolAddress[networkInstance] : undefined) ||
    f.values.protocolAddress;

  const amountText = createAmountText(amount);

  return (
    <>
      <InfoCard {...props}>
        <Box mx={['loose', 'extra-loose']}>
          <LiquidStackingAmountInfo title="You'll liquid stack" amountText={amountText} />

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
                <Label>Contract</Label>
                <Value>
                  {protocolStxAddress && (
                    <OpenExternalLinkInNewTab
                      href={makeExplorerTxLink(protocolStxAddress, networkName)}
                    >
                      {truncateMiddle(protocolStxAddress)}
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
