import { addSeconds, formatDistanceToNow } from 'date-fns';
import { Flex, FlexProps, styled } from 'leather-styles/jsx';
import { token } from 'leather-styles/tokens';

import { ClockIcon } from '@components/icons/clock';

interface NextCycleStartTimeProps extends FlexProps {
  /**
   * Time, in seconds, until the start of the next cycle.
   */
  timeUntilNextCycle: number;
}

export function NextCycleStartTime({ timeUntilNextCycle, ...rest }: NextCycleStartTimeProps) {
  const timeUntilNextCycleText = formatDistanceToNow(addSeconds(new Date(), timeUntilNextCycle));
  return (
    <Flex {...rest}>
      <Flex
        width="44px"
        height="44px"
        background={token('colors.ink.text-primary')}
        borderRadius="50%"
        alignItems="flex-start"
        justifyContent="flex-start"
      >
        <ClockIcon size="24px" />
      </Flex>
      <Flex ml="base" flexDirection="column">
        <styled.h4 display="block" textStyle="body.01" lineHeight="20px">
          Next cycle starts in
        </styled.h4>
        <styled.p
          display="block"
          textStyle="body.01"
          color="ink.text-subdued"
          lineHeight="20px"
          mt="space.01"
        >
          {timeUntilNextCycleText}
        </styled.p>
      </Flex>
    </Flex>
  );
}
