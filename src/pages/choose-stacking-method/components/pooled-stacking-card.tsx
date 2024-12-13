import { StackingMethodCard } from 'src/pages/choose-stacking-method/components/stacking-method-card';
import { usePooledStackingButton } from 'src/pages/choose-stacking-method/hooks';

import IconUserGroup from '@assets/images/ic-group.svg';
import IconLock from '@assets/images/ic-lock.svg';
import IconStack from '@assets/images/ic-stack.svg';
import DivingBoardIllustration from '@assets/images/stack-in-a-pool.svg';

import { ChooseStackingMethodLayoutProps } from '../types';

export function PooledStackingCard(props: ChooseStackingMethodLayoutProps) {
  const { isDisabled, onClick } = usePooledStackingButton(props);
  const benefits = [
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    { icon: IconLock as any as React.FC, title: "Interact with pool operators' contracts" },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    { icon: IconUserGroup as any as React.FC, title: 'A pool provider stacks on your behalf' },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    { icon: IconStack as any as React.FC, title: 'No minimum required' },
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
