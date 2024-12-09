import { Flex, FlexProps, styled } from 'leather-styles/jsx';

import { StepsIcon } from '@components/icons/steps';
import { toHumanReadableStx } from '@utils/unit-convert';

interface EstimatedMinimumLabelProps extends FlexProps {
  /**
   * Extimated amount of uSTX needed to start stacking.
   */
  estimatedStackingMinimum: bigint;
}
export function EstimatedMinimumLabel({
  estimatedStackingMinimum,
  ...rest
}: EstimatedMinimumLabelProps) {
  return (
    <Flex marginLeft="space.05" {...rest}>
      <Flex
        width="48px"
        height="48px"
        background="ink.background-secondary"
        borderRadius="50%"
        alignItems="center"
        justifyContent="center"
      >
        <StepsIcon width="14px" height="14px" />
      </Flex>
      <Flex ml="space.04" flexDirection="column">
        <styled.h4 display="block" textStyle="body.01" lineHeight="20px">
          Estimated minimum
        </styled.h4>
        <styled.p
          display="block"
          textStyle="body.01"
          color="ink.text-subdued"
          lineHeight="20px"
          mt="space.01"
        >
          {toHumanReadableStx(estimatedStackingMinimum)}
        </styled.p>
      </Flex>
    </Flex>
  );
}
