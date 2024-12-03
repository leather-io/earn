import { IconLock, IconStairs } from '@tabler/icons-react';
import { StackingMethodCard } from 'src/pages/choose-stacking-method/components/stacking-method-card';
import { usePooledStackingButton } from 'src/pages/choose-stacking-method/hooks';

import DivingBoardIllustration from '@assets/images/stack-in-a-pool.svg';
import { Users } from '@components/icons/users';

import { ChooseStackingMethodLayoutProps } from '../types';

export function PooledStackingCard(props: ChooseStackingMethodLayoutProps) {
  const { isDisabled, onClick } = usePooledStackingButton(props);
  const benefits = [
    { icon: IconLock, title: 'Interact with the protocol directly' },
    { icon: Users, title: 'A pool stacks on your behalf' },
    { icon: IconStairs, title: 'No minimum required' },
  ];

  return (
    <StackingMethodCard
      {...props}
      title="Stack in a pool"
      description="Delegate to a Stacking pool provider, enabling you to stack even if you don't meet the minimum. The Stacking provider may maintain discretion with payment of rewards."
      icon={<DivingBoardIllustration />}
      benefits={benefits}
      onButtonPress={onClick}
      buttonDisabled={isDisabled}
      buttonText="Stack in a pool"
      hasSufficientBalance={props.isSignedIn && props.hasEnoughBalanceToPool}
    />
  );
}
