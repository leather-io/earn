import { StackingMethodCard } from 'src/pages/choose-stacking-method/components/stacking-method-card';
import { useLiquidStackingButton } from 'src/pages/choose-stacking-method/hooks';

import IconUserGroup from '@assets/images/ic-group.svg';
import IconLock from '@assets/images/ic-lock.svg';
import IconStack from '@assets/images/ic-stack.svg';
import MeltingIceIllustration from '@assets/images/liquid-stacking.svg';

import { ChooseStackingMethodLayoutProps } from '../types';

export function LiquidStackingCard(props: ChooseStackingMethodLayoutProps) {
  const { isDisabled, onClick } = useLiquidStackingButton(props);
  const benefits = [
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    { icon: IconLock as any as React.FC, title: 'Interact with liquid stacking contracts' },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    { icon: IconUserGroup as any as React.FC, title: 'Liquid staking protocol stacks on your behalf' },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    { icon: IconStack as any as React.FC, title: 'No minimum required' },
  ];

  return (
    <StackingMethodCard
      {...props}
      title="Liquid Stacking"
      description="Stack with a liquid stacking protocol, seamlessly enabling you to retain your liquidity in a liquid staking token. The provider may charge a small commission on rewards."
      icon={<MeltingIceIllustration />}
      benefits={benefits}
      onButtonPress={onClick}
      buttonDisabled={isDisabled}
      buttonText="Stack liquid"
      hasSufficientBalance={props.isSignedIn && props.hasEnoughBalanceToPool}
    />
  );
}
