import { useCallback, useMemo, useState } from 'react';

import { Button } from '@leather.io/ui';
import { Box, Flex, styled } from 'leather-styles/jsx';
import { BridgingStepCard } from 'src/pages/choose-stacking-method/components/bridging-step-card';

import EnrollIllustration from '@assets/images/enroll.svg';
import EnrollIcon from '@assets/images/ic-btn-enroll.svg';
import PoolLogosIcon from '@assets/images/ic-btn-pool-logos.svg';
import ChevronDownIcon from '@assets/images/ic-chevron-down.svg';
import AlexLogo from '@assets/images/logo-alex.svg';
import BitflowLogo from '@assets/images/logo-bitflow.svg';
import VelarLogo from '@assets/images/logo-velar.svg';
import { useAuth } from '@components/auth-provider/auth-provider';
import { BaseDrawer } from '@components/drawer/base-drawer';

import { ChooseStackingMethodLayoutProps } from '../types';

const PoolOption = styled(Box, {
  base: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 'space.02',
    borderTop: '1px solid $border-default',
    background: 'white',

    '&:hover': {
      background: '$surface-surface-raised',
    },
  },
});

const LogoWrapper = styled(Flex, {
  base: {
    alignItems: 'center',
    height: 'space.06',
    '& > svg': {
      height: 'space.06',
      width: 'auto',
    },
  },
});

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

const ExpandableButton = styled(Box, {
  base: {
    width: '100%',
    borderColor: 'ink.action-primary-default',
    borderWidth: '1px',
    borderRadius: 'xs',
    overflow: 'hidden',
  },
});

const ChevronWrapper = styled(Flex, {
  base: {
    transition: 'transform 200ms ease-in-out',
    alignItems: 'center',
  },
  variants: {
    expanded: {
      true: {
        transform: 'rotate(180deg)',
      },
    },
  },
});

const StyledLink = styled('a', {
  base: {
    textStyle: 'body.01',
    color: 'ink.action-primary-default',
    textDecoration: 'underline',
    textAlign: 'center',
    cursor: 'pointer',
    '&:hover': {
      color: 'ink.action-primary-hover',
    },
  },
});

export function EnrollForSbtcRewardsCard(props: ChooseStackingMethodLayoutProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isPoolExpanded, setIsPoolExpanded] = useState(false);
  const [hasEnrolled, setHasEnrolled] = useState(false);
  const { isSignedIn } = useAuth();

  const enrolledButtonText = useMemo(() => {
    if (hasEnrolled) return `You're already enrolled in the next cycle`;
    if (isSignedIn) return 'Enroll';
    return 'Sign in to enroll';
  }, [hasEnrolled, isSignedIn]);

  const poolOptions = [
    { name: 'Velar', Logo: VelarLogo, url: 'https://app.velar.com/pool' },
    { name: 'Bitflow', Logo: BitflowLogo, url: 'https://app.bitflow.finance/sbtc#earn3' },
    { name: 'Alex', Logo: AlexLogo, url: 'https://app.alexlab.co/pool' },
  ];

  return (
    <Box css={{ position: 'relative' }}>
      <BridgingStepCard
        step={2}
        disabled={hasEnrolled}
        title="Enroll and keep sBTC in your wallet"
        description="The more sBTC you hold in your wallet, the greater your rewards. Rewards are automatically distributed from the protocol, giving you more sBTC to grow your holdings."
        icon={<EnrollIllustration />}
        buttonText=""
        {...props}
      >
        <StyledActionButton
          onClick={() => {
            if (!isSignedIn) return window.scrollTo({ top: 0, behavior: 'smooth' });
            setIsModalOpen(true);
          }}
          disabled={hasEnrolled}
        >
          <span>{enrolledButtonText}</span>
          <EnrollIcon />
        </StyledActionButton>

        <ExpandableButton>
          <Button
            variant="ghost"
            css={{
              width: '100%',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: 'space.02',
              background: 'white',
              '&:hover': {
                background: '',
              },
            }}
            onClick={() => setIsPoolExpanded(!isPoolExpanded)}
          >
            <Flex css={{ alignItems: 'center', gap: '$1' }}>
              <span>Explore Pools</span>
              <ChevronWrapper expanded={isPoolExpanded}>
                <ChevronDownIcon />
              </ChevronWrapper>
            </Flex>
            {!isPoolExpanded && <PoolLogosIcon />}
          </Button>

          {isPoolExpanded && (
            <>
              {poolOptions.map(pool => (
                <a
                  key={pool.name}
                  href={pool.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    textDecoration: 'none',
                    color: 'inherit',
                  }}
                >
                  <PoolOption>
                    <span>{pool.name}</span>
                    <LogoWrapper>
                      <pool.Logo />
                    </LogoWrapper>
                  </PoolOption>
                </a>
              ))}
            </>
          )}
        </ExpandableButton>
      </BridgingStepCard>

      <BaseDrawer
        title="Enroll for sBTC rewards"
        isShowing={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      >
        <Flex alignItems="center" flexDirection="column" p="space.04">
          <Box mx="space.04" my="space.02">
            <Flex flexDirection="column">
              <Box textStyle="body.01" mb="space.04" color="ink.text-primary">
                Please note that Leather does not provide this rewards program. It is operated by
                Bitcoin L2 Labs. You are enrolling at your own risk.
              </Box>

              <Flex flexDirection="column" gap="space.04" mt="space.06">
                <Button
                  onClick={async () => {
                    setIsModalOpen(false);
                  }}
                >
                  Confirm and enroll
                </Button>

                <StyledLink
                  href="https://bitcoinismore.org"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Learn more
                </StyledLink>
              </Flex>
            </Flex>
          </Box>
        </Flex>
      </BaseDrawer>
    </Box>
  );
}
