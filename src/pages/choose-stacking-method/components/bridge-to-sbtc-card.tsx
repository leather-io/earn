import { BridgingStepCard } from 'src/pages/choose-stacking-method/components/bridging-step-card';

import BridgeIllustration from '@assets/images/bridge.svg';

import { ChooseStackingMethodLayoutProps } from '../types';

export function BridgeToSBTCCard(props: ChooseStackingMethodLayoutProps) {
  return (
    <BridgingStepCard
      {...props}
      step={1}
      title="Bridge BTC to sBTC"
      description="Convert your bitcoin to sBTC to access the rewards program. Stay liquid while earning yield on the Stacks network."
      icon={<BridgeIllustration />}
      onButtonPress={() => {
        // TODO: Implement bridge to sBTC
      }}
      buttonText="Bridge sBTC"
    />
  );
}
