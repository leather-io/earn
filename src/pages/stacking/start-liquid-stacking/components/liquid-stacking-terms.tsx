import { Stack, StackProps, Text } from '@stacks/ui';
import { IconLock } from '@tabler/icons-react';

import { Stacks } from '@components/icons/stacks';
import { StepsIcon } from '@components/icons/steps';
import { pseudoBorderLeft } from '@components/styles/pseudo-border-left';

import { StackingTermItem } from '../../components/stacking-term';

export function LiquidStackingTerms({ ...rest }: StackProps) {
  return (
    <Stack
      textStyle={['body.small', 'body.large']}
      spacing="base-loose"
      pl="base"
      {...pseudoBorderLeft('feedback-alert')}
      {...rest}
    >
      <StackingTermItem
        title="This transaction can’t be reversed"
        icon={<IconLock width="16px" height="16px" />}
      >
        <Text>
          There is no way to unlock your STX once the protocol starts stacking them. You must wait
          until they unlock at the end of the protocol&apos;s chosen number of cycles.
        </Text>
      </StackingTermItem>
      <StackingTermItem
        title="Research your protocol"
        icon={<StepsIcon width="16px" height="16px" />}
      >
        <Text>
          Paying out rewards is at the discretion of the protocol. Make sure you’ve researched and
          trust the protocol you’re using.
        </Text>
      </StackingTermItem>
      <StackingTermItem
        title="Stacking with Protocol Contract"
        icon={<Stacks width="16px" height="16px" />}
      >
        <Text>
          The protocol uses a smart contract that handles your stacking. By allowing the contract to
          call Stacking functions, you agree to the rules of the Protocol contract.
        </Text>
      </StackingTermItem>
    </Stack>
  );
}
