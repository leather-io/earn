import { useState } from 'react';

import { Button } from '@leather.io/ui';
import { Box, Flex, styled } from 'leather-styles/jsx';
import { BridgingStepCard } from 'src/pages/choose-stacking-method/components/bridging-step-card';
import { useLeatherSbtcBridgeButton } from 'src/pages/choose-stacking-method/hooks';

import BridgeIllustration from '@assets/images/bridge.svg';
import BtcToSbtcIcon from '@assets/images/ic-btn-bridge-btc.svg';
import StxToSbtcIcon from '@assets/images/ic-btn-swap-stx.svg';
import { BaseDrawer } from '@components/drawer/base-drawer';

import { ChooseStackingMethodLayoutProps } from '../types';

const StyledActionButton = styled(Button, {
  base: {
    color: 'text-primary',
    background: 'white',
    borderColor: 'ink.action-primary-default',
    borderWidth: '1px',
    borderRadius: 'xs',
    padding: 'space.02',
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    minHeight: '46px',

    '&:hover': {
      background: '',
    },
  },
});

export function BridgeToSBTCCard(props: ChooseStackingMethodLayoutProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { onClick: onBtcClick } = useLeatherSbtcBridgeButton(setIsModalOpen, 'btc');
  const { onClick: onStxClick } = useLeatherSbtcBridgeButton(setIsModalOpen, 'stx');

  return (
    <>
      <BridgingStepCard
        {...{ ...props, onButtonPress: undefined }}
        step={1}
        title="Get sBTC"
        description={
          <>
            Convert your bitcoin or stacks tokens to sBTC to access the rewards program. Stay liquid
            while earning yield on the Stacks network.
          </>
        }
        icon={<BridgeIllustration />}
      >
        <Flex flexDirection="column" gap="space.03" width="100%">
          <StyledActionButton onClick={onBtcClick}>
            <span>Bridge Bitcoin</span>
            <BtcToSbtcIcon />
          </StyledActionButton>
          <StyledActionButton onClick={onStxClick}>
            <span>Swap stacks token</span>
            <StxToSbtcIcon />
          </StyledActionButton>
        </Flex>
      </BridgingStepCard>
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
            </Flex>
          </Box>
        </Flex>
      </BaseDrawer>
    </>
  );
}
