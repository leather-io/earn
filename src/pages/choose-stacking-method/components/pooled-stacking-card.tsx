import {StackingMethodCard } from 'src/pages/choose-stacking-method/components/stacking-method-card';
import { usePooledStackingButton } from 'src/pages/choose-stacking-method/hooks';

import DivingBoardIllustration from '@assets/images/stack-in-a-pool.svg';
import { Users } from '@components/icons/users';

import { ChooseStackingMethodLayoutProps } from '../types';

import IconLock from '@assets/images/ic-lock.svg';
import IconStack from '@assets/images/ic-stack.svg';
import IconUserGroup from '@assets/images/ic-group.svg';

export function PooledStackingCard(props: ChooseStackingMethodLayoutProps) {
  const { isDisabled, onClick } = usePooledStackingButton(props);
  const benefits = [
    { icon: IconLock, title: 'Interact with the protocol directly' },
    { icon: IconUserGroup, title: 'A pool stacks on your behalf' },
    { icon: IconStack, title: 'No minimum required' },
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
