import { useCallback, useMemo, useState } from 'react';

import { Button } from '@leather.io/ui';
import { Box, Flex, styled } from 'leather-styles/jsx';
import { BridgingStepCard } from 'src/pages/choose-stacking-method/components/bridging-step-card';

import EnrollIllustration from '@assets/images/enroll.svg';
import { useAuth } from '@components/auth-provider/auth-provider';
import { BaseDrawer } from '@components/drawer/base-drawer';
import { useEnrolledStatus, useSbtcEnroll } from '@hooks/use-enroll-transaction';
import { analytics } from '@utils/analytics';

import { ChooseStackingMethodLayoutProps } from '../types';

export function EnrollForSbtcRewardsCard(props: ChooseStackingMethodLayoutProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
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

  return (
    <>
      <BridgingStepCard
        step={2}
        disabled={userEnrolled}
        title="Enroll and keep sBTC in your wallet"
        description="The more sBTC you hold in your wallet, the greater your rewards. Rewards are automatically distributed from the protocol, giving you more sBTC to grow your holdings."
        icon={<EnrollIllustration />}
        onButtonPress={() => {
          if (!isSignedIn) return window.scrollTo({ top: 0, behavior: 'smooth' });
          setIsModalOpen(true);
        }}
        buttonText={enrolledButtonText}
        {...props}
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
                Please note that Leather does not provide this rewards program. It is operated by
                Bitcoin L2 Labs. You are enrolling at your own risk.
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
