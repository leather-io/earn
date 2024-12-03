import { Eye1Icon, LockIcon, StacksIcon } from '@leather.io/ui';
import { css } from 'leather-styles/css';
import { Stack, StackProps, styled } from 'leather-styles/jsx';

import { StackingTermItem } from '../../components/stacking-term';

export function LiquidStackingTerms({ ...rest }: StackProps) {
  return (
    <Stack
      textStyle={['body.small', 'body.large']}
      pl="base"
      className={css({
        position: 'relative',
        _before: {
          content: '""',
          top: 0,
          left: 0,
          borderRadius: '8px',
          width: '4px',
          height: '100%',
          position: 'absolute',
          background: 'ink.action-primary-hover',
        },
      })}
      {...rest}
    >
      <StackingTermItem
        title="This transaction can’t be reversed"
        icon={<LockIcon width="16px" height="16px" />}
      >
        <styled.p>
          You are transferring STX to the liquid stacking protocol. To receive STX back, you must
          request them from the protocol.
        </styled.p>
      </StackingTermItem>
      <StackingTermItem
        title="Research your protocol"
        icon={<Eye1Icon width="16px" height="16px" />}
      >
        <styled.p>
          Paying out rewards is at the discretion of the protocol. Make sure you’ve researched and
          trust the protocol you’re using.
        </styled.p>
      </StackingTermItem>
      <StackingTermItem
        title="Stacking with Protocol Contract"
        icon={<StacksIcon width="16px" height="16px" />}
      >
        <styled.p>
          The protocol uses a smart contract that handles your stacking. By allowing the contract to
          call Stacking functions, you agree to the rules of the Protocol contract.
        </styled.p>
      </StackingTermItem>
    </Stack>
  );
}
