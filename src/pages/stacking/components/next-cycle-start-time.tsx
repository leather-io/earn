import { addSeconds, formatDistanceToNow } from 'date-fns';

import { ClockIcon } from '@components/icons/clock';
import { Flex, FlexProps, styled } from 'leather-styles/jsx';

interface NextCycleStartTimeProps extends FlexProps {
  /**
   * Time, in seconds, until the start of the next cycle.
   */
  timeUntilNextCycle: number;
}

export function NextCycleStartTime({ timeUntilNextCycle, ...rest }: NextCycleStartTimeProps) {
  const timeUntilNextCycleText = formatDistanceToNow(addSeconds(new Date(), timeUntilNextCycle));
  return (
    <Flex alignItems="center" {...rest}>
      <Flex
        width="48px"
        height="48px"
        background="ink.background-secondary"
        borderRadius="50%"
        alignItems="center"
        justifyContent="center"
      >
        <ClockIcon size="24px" />
      </Flex>
      <Flex ml="space.04" flexDirection="column">
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
