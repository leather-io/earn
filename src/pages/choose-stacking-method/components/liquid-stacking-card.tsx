import { IconLock, IconStairs } from '@tabler/icons-react';
import { StackingMethodCard } from 'src/pages/choose-stacking-method/components/stacking-method-card';
import { useLiquidStackingButton } from 'src/pages/choose-stacking-method/hooks';

import MeltingIceIllustration from '@assets/images/liquid-stacking.svg';
import { Users } from '@components/icons/users';

import { ChooseStackingMethodLayoutProps } from '../types';

export function LiquidStackingCard(props: ChooseStackingMethodLayoutProps) {
  const { isDisabled, onClick } = useLiquidStackingButton(props);
  const benefits = [
    { icon: IconLock, title: 'Interact with liquid stacking contracts' },
    { icon: Users, title: 'A protocol stacks on your behalf' },
    { icon: IconStairs, title: 'No minimum required' },
  ];

  return (
    <StackingMethodCard
      {...props}
      title="Liquid Stacking"
      description="Stack with a liquid stacking protocol, enabling you to retain your liquidity in stSTX tokens and auto-compound yield in STX. The provider may charge a small commission on rewards."
      icon={<MeltingIceIllustration />}
      benefits={benefits}
      onButtonPress={onClick}
      buttonDisabled={isDisabled}
      buttonText="Stack liquid"
      hasSufficientBalance={props.isSignedIn && props.hasEnoughBalanceToPool}
    />
  );
}
