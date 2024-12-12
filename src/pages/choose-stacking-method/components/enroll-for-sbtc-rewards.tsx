import { useState } from 'react';

import { Button } from '@leather.io/ui';
import { Box, Flex, styled } from 'leather-styles/jsx';
import { BridgingStepCard } from 'src/pages/choose-stacking-method/components/bridging-step-card';

import EnrollIllustration from '@assets/images/enroll.svg';
import { BaseDrawer } from '@components/drawer/base-drawer';

import { ChooseStackingMethodLayoutProps } from '../types';

export function EnrollForSBTCRewardsCard(props: ChooseStackingMethodLayoutProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <BridgingStepCard
        {...props}
        step={2}
        title="Enroll and keep sBTC in your wallet"
        description="The more sBTC you hold in your wallet, the greater your rewards. Rewards are automatically distributed from the protocol, giving you more sBTC to grow your holdings."
        icon={<EnrollIllustration />}
        onButtonPress={() => setIsModalOpen(true)}
        buttonText="Enroll"
      />

      <BaseDrawer
        title="Enroll for sBTC rewards"
        isShowing={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      >
        <Flex alignItems="center" flexDirection="column" p="space.04">
          <Box mx="space.04" my="space.02">
            <Flex flexDirection="column">
              <styled.p textStyle="body.01" mb="space.04" color="ink.text-primary">
                Please note that Leather does not provide this rewards program. It is operated by Bitcoin L2 Labs. You are enrolling at your own risk.
              </styled.p>

              <Flex flexDirection="column" gap="space.04" mt="space.06">
                <Button
                  onClick={() => {
                    // TODO: Implement enrollment logic with contract call
                    setIsModalOpen(false);
                  }}
                >
                  Confirm and enroll
                </Button>

                <styled.a
                  href="https://bitcoinismore.org"
                  target="_blank"
                  rel="noopener noreferrer"
                  textStyle="body.01"
                  color="ink.action-primary-default"
                  textDecoration="underline"
                  textAlign="center"
                  _hover={{
                    color: 'ink.action-primary-hover',
                    textDecoration: 'none',
                  }}
                >
                  Learn more
                </styled.a>
              </Flex>
            </Flex>
          </Box>
        </Flex>
      </BaseDrawer>
    </>
  );
}
