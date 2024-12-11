import { addSeconds, formatDistanceToNow } from 'date-fns';
import { Flex, FlexProps, styled } from 'leather-styles/jsx';

import IconHourglass from '@assets/images/ic-hourglass-24.svg';

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
        <IconHourglass />
      </Flex>
      <Flex ml="space.04" flexDirection="column">
        <styled.h4 color="ink.text-subdued" display="block" textStyle="body.01" lineHeight="20px">
          Next cycle starts in
        </styled.h4>
        <styled.p
          display="block"
          textStyle="body.01"
          lineHeight="20px"
          mt="space.01"
        >
          {timeUntilNextCycleText}
        </styled.p>
      </Flex>
    </Flex>
  );
}
