import { FC } from 'react';

import { IconLock } from '@tabler/icons-react';
import { Stack, StackProps, styled } from 'leather-styles/jsx';

import { StepsIcon } from '@components/icons/steps';
import { pseudoBorderLeft } from '@components/styles/pseudo-border-left';

import { StackingTermItem } from '../../components/stacking-term';

export const DirectStackingTerms: FC<StackProps> = props => (
  <Stack
    textStyle={['body.02', 'body.03']}
    gap="space.02"
    pl="space.03"
    {...pseudoBorderLeft('feedback-alert')}
    {...props}
  >
    <StackingTermItem
      title="This transaction can’t be reversed"
      icon={<IconLock width="16px" height="16px" />}
    >
      <styled.p>
        STX will be locked in your wallet for your chosen duration, even if an increase in the
        minimum causes you to end up with fewer or no reward slots.
      </styled.p>
      <styled.p>
        There will be no way to unlock your STX before the chosen duration is finished.
      </styled.p>
      <styled.p>
        Nor will you be able to change the entered BTC address. Ensure it&apos;s entered correctly
        and you have control over it.
      </styled.p>
    </StackingTermItem>
    <StackingTermItem title="Dynamic minimum" icon={<StepsIcon width="16px" height="16px" />}>
      <styled.p>
        If the minimum increases, you could end up with fewer or no reward slots, even if you’ve
        added a buffer. There will be no way to lock more STX for Stacking with this address until
        the selected duration is finished.
      </styled.p>
    </StackingTermItem>
  </Stack>
);
