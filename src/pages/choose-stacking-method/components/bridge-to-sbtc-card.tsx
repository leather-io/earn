import { useState } from 'react';

import { Button } from '@leather.io/ui';
import { Box, Flex, styled } from 'leather-styles/jsx';
import { BridgingStepCard } from 'src/pages/choose-stacking-method/components/bridging-step-card';
import { useLeatherSbtcBridgeButton } from 'src/pages/choose-stacking-method/hooks';

import BridgeIllustration from '@assets/images/bridge.svg';
import { BaseDrawer } from '@components/drawer/base-drawer';
import { openExternalLink } from '@utils/external-links';

import { ChooseStackingMethodLayoutProps } from '../types';

export function BridgeToSBTCCard(props: ChooseStackingMethodLayoutProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { onClick } = useLeatherSbtcBridgeButton(setIsModalOpen);

  return (
    <>
      <BridgingStepCard
        {...props}
        step={1}
        title="Bridge BTC to sBTC"
        description="Convert your bitcoin to sBTC to access the rewards program. Stay liquid while earning yield on the Stacks network."
        icon={<BridgeIllustration />}
        onButtonPress={onClick}
        buttonText="Bridge sBTC"
      />
      <BaseDrawer
        title="Install Leather to bridge sBTC"
        isShowing={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      >
        <Flex alignItems="center" flexDirection="column" p="space.04">
          <Box mx="space.04" my="space.02">
            <Flex flexDirection="column">
              <styled.p textStyle="body.01" mb="space.04" color="ink.text-primary">
                The version of Leather installed does not support this feature. Please update
                Leather (6.56+) to bridge sBTC.
              </styled.p>

              <Flex flexDirection="column" gap="space.04" mt="space.06">
                <Button
                  onClick={() => {
                    setIsModalOpen(false);
                    openExternalLink(
                      'https://chromewebstore.google.com/detail/leather/ldinpeekobnhjjdofggfgjlcehhmanlj'
                    );
                  }}
                >
                  Update Leather
                </Button>
              </Flex>
            </Flex>
          </Box>
        </Flex>
      </BaseDrawer>
    </>
  );
}
