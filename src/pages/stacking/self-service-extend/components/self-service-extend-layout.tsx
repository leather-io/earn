import { useNavigate } from 'react-router-dom';

import { StackerInfo } from '@stacks/stacking';
import { Box, Button, Flex, Text } from '@stacks/ui';
import { IconLock } from '@tabler/icons-react';

import { Address } from '@components/address';
import { BaseDrawer } from '@components/drawer/base-drawer';
import { Hr } from '@components/hr';
import {
  InfoCardGroup as Group,
  InfoCard,
  InfoCardLabel as Label,
  InfoCardRow as Row,
  InfoCardSection as Section,
  InfoCardValue as Value,
} from '@components/info-card';
import routes from '@constants/routes';
import { formatPoxAddressToNetwork } from '@utils/stacking';

import { Description } from '../../components/stacking-form-step';

interface SelfServiceLayoutProps {
  title: string;
  details: (StackerInfo & { stacked: true })['details'] | undefined;
  isContractCallExtensionPageOpen: boolean;
}
export function SelfServiceLayout(props: SelfServiceLayoutProps) {
  const { title, details, isContractCallExtensionPageOpen } = props;
  const navigate = useNavigate();
  const poxAddress = details ? formatPoxAddressToNetwork(details.pox_address) : undefined;
  const onClose = () => {
    navigate(routes.POOLED_STACKING_INFO);
  };
  return (
    <BaseDrawer title={title} isShowing onClose={onClose}>
      <Flex alignItems="center" flexDirection="column" pb={['loose', '48px']} px="loose">
        <InfoCard width="420px">
          <Box mx={['loose', 'extra-loose']}>
            <Flex flexDirection="column" pt="extra-loose" pb="base-loose">
              {details ? (
                <>
                  <Text textStyle="body.large.medium">You&apos;re stacking</Text>
                  <Text
                    fontSize="24px"
                    fontFamily="Open Sauce"
                    fontWeight={500}
                    letterSpacing="-0.02em"
                    mt="extra-tight"
                  >
                    for {details.lock_period} cycles
                  </Text>
                </>
              ) : (
                <>
                  <Text textStyle="body.large.medium">You&apos;re pooling</Text>
                  <Text
                    fontSize="24px"
                    fontFamily="Open Sauce"
                    fontWeight={500}
                    letterSpacing="-0.02em"
                    mt="extra-tight"
                  >
                    with Fast Pool
                  </Text>
                </>
              )}
            </Flex>
            <Hr />
            <Description>
              <Text>Lock your stacks for the next cycle.</Text>
            </Description>
            <Group pt="base-loose">
              <Section>
                {details && poxAddress && (
                  <>
                    <Row>
                      <Label explainer="STX will unlock after that cycle">End</Label>
                      <Value>Cycle {details.first_reward_cycle + details.lock_period - 1} </Value>
                    </Row>

                    <Row>
                      <Label>Bitcoin address</Label>
                      <Value>
                        <Address address={poxAddress} />
                      </Value>
                    </Row>
                  </>
                )}
                <Row m="loose" justifyContent="space-between">
                  <Button mode="tertiary" onClick={onClose}>
                    Cancel
                  </Button>
                  <Button type="submit" isLoading={isContractCallExtensionPageOpen}>
                    <Box mr="loose">
                      <IconLock />
                    </Box>
                    Lock STX
                  </Button>
                </Row>
              </Section>
            </Group>
          </Box>
        </InfoCard>
      </Flex>
    </BaseDrawer>
  );
}
