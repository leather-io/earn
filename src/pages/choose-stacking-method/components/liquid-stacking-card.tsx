import { StackingMethodCard } from 'src/pages/choose-stacking-method/components/stacking-method-card';
import { useLiquidStackingButton } from 'src/pages/choose-stacking-method/hooks';

import MeltingIceIllustration from '@assets/images/liquid-stacking.svg';
import { Users } from '@components/icons/users';

import { ChooseStackingMethodLayoutProps } from '../types';

import IconLock from '@assets/images/ic-lock.svg';
import IconStack from '@assets/images/ic-stack.svg';
import IconUserGroup from '@assets/images/ic-group.svg';

export function LiquidStackingCard(props: ChooseStackingMethodLayoutProps) {
  const { isDisabled, onClick } = useLiquidStackingButton(props);
  const benefits = [
    { icon: IconLock, title: 'Interact with liquid stacking contracts' },
    { icon: IconUserGroup, title: 'A protocol stacks on your behalf' },
    { icon: IconStack, title: 'No minimum required' },
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
