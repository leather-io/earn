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
import { useEnrolledStatus, useSbtcEnroll } from '@hooks/use-enroll-transaction';
import { analytics } from '@utils/analytics';

import { ChooseStackingMethodLayoutProps } from '../types';

const StyledPoolOption = styled('a', {
  base: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 'space.02',
    borderTop: '1px solid $border-default',
    background: 'white',
    textDecoration: 'none',
    color: 'inherit',

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

  const { data: enrolledQuery, refetch } = useEnrolledStatus();

  const onEnrollFinish = useCallback(() => {
    refetch();
    setHasEnrolled(true);
  }, [refetch]);

  const { createSbtcYieldEnrollContractCall } = useSbtcEnroll({ onFinish: onEnrollFinish });

  const userEnrolled = useMemo(() => {
    return enrolledQuery?.isEnrolled || hasEnrolled;
  }, [enrolledQuery?.isEnrolled, hasEnrolled]);

  const enrolledButtonText = useMemo(() => {
    if (userEnrolled) return `You're already enrolled in the next cycle`;
    if (isSignedIn) return 'Enroll';
    return 'Sign in to enroll';
  }, [userEnrolled, isSignedIn]);

  const poolOptions = [
    { name: 'Velar', Logo: VelarLogo, url: 'https://app.velar.com/pool' },
    { name: 'Bitflow', Logo: BitflowLogo, url: 'https://bitflow.finance' },
    { name: 'Alex', Logo: AlexLogo, url: 'https://app.alexlab.co/pool' },
  ];

  return (
    <Box css={{ position: 'relative' }}>
      <BridgingStepCard
        {...props}
        step={2}
        disabled={userEnrolled}
        title="Enroll and keep sBTC in your wallet"
        description="The more sBTC you hold in your wallet, the greater your rewards. Rewards are automatically distributed from the protocol, giving you more sBTC to grow your holdings."
        icon={<EnrollIllustration />}
      >
        <StyledActionButton
          onClick={() => {
            if (!isSignedIn) return window.scrollTo({ top: 0, behavior: 'smooth' });
            setIsModalOpen(true);
          }}
          disabled={userEnrolled}
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
        >
          <span>{enrolledButtonText}</span>
          <EnrollIcon />
        </StyledActionButton>

        <ExpandableButton>
          <StyledActionButton
            onClick={() => setIsPoolExpanded(!isPoolExpanded)}
            css={{
              border: 'none',
              borderRadius: '0',
            }}
          >
            <Flex alignItems="center" gap="space.02">
              <span>Explore pools</span>
              <ChevronWrapper expanded={isPoolExpanded}>
                <ChevronDownIcon />
              </ChevronWrapper>
            </Flex>
            {!isPoolExpanded && <PoolLogosIcon />}
          </StyledActionButton>

          {isPoolExpanded && (
            <Box>
              {poolOptions.map(({ name, Logo, url }) => (
                <StyledPoolOption key={name} href={url} target="_blank" rel="noopener noreferrer">
                  <span>{name}</span>
                  <LogoWrapper>
                    <Logo />
                  </LogoWrapper>
                </StyledPoolOption>
              ))}
            </Box>
          )}
        </ExpandableButton>
      </BridgingStepCard>

      <BaseDrawer
        title="Enroll in sBTC Rewards"
        isShowing={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      >
        <Flex alignItems="center" flexDirection="column" p="space.04">
          <Box mx="space.04" my="space.02">
            <Flex flexDirection="column">
              <styled.p textStyle="body.01" mb="space.04" color="ink.text-primary">
                Enroll in the sBTC rewards program to start earning yield on your sBTC holdings.
                Rewards are distributed automatically from the protocol.
              </styled.p>

              <Flex flexDirection="column" gap="space.04" mt="space.06">
                <Button
                  onClick={async () => {
                    analytics.untypedTrack('sbtc_earn_enrollment_started');
                    await createSbtcYieldEnrollContractCall();
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
