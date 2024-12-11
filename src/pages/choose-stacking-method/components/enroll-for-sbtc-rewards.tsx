import { BridgingStepCard } from 'src/pages/choose-stacking-method/components/bridging-step-card';

import EnrollIllustration from '@assets/images/enroll.svg';

import { ChooseStackingMethodLayoutProps } from '../types';

export function EnrollForSBTCRewardsCard(props: ChooseStackingMethodLayoutProps) {
  return (
    <BridgingStepCard
      {...props}
      step={2}
      title="Enroll and keep sBTC in your wallet"
      description="The more sBTC you hold in your wallet, the greater your rewards. Rewards are automatically distributed from the protocol, giving you more sBTC to grow your holdings."
      icon={<EnrollIllustration />}
      onButtonPress={() => {
        // TODO: Implement enroll in sBTC rewards
      }}
      buttonText="Enroll"
    />
  );
}
