import { Flex, FlexProps, styled } from 'leather-styles/jsx';

import IconStack from '@assets/images/ic-stack-24.svg';
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
        <IconStack />
      </Flex>
      <Flex ml="space.04" flexDirection="column">
        <styled.h4 color="ink.text-subdued" display="block" textStyle="body.01" lineHeight="20px">
          Estimated minimum
        </styled.h4>
        <styled.p
          display="block"
          textStyle="body.01"
          lineHeight="20px"
          mt="space.01"
        >
          {toHumanReadableStx(estimatedStackingMinimum)}
        </styled.p>
      </Flex>
    </Flex>
  );
}
