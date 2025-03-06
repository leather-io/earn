import { forwardRef } from 'react';

import { Flex, FlexProps, styled } from 'leather-styles/jsx';

export const Badge = forwardRef<HTMLDivElement, FlexProps>(({ children, ...rest }, ref) => (
  <Flex
    ref={ref}
    alignItems="center"
    justify="center"
    borderRadius="2px"
    height="44px"
    px={['8px', '8px', '12px']}
    color="white"
    borderWidth="1px"
    {...rest}
  >
    <styled.p
      display="block"
      lineHeight="16px"
      fontSize={['10px', '10px', '11px']}
      fontWeight={600}
      color="currentColor"
    >
      {children}
    </styled.p>
  </Flex>
));

Badge.displayName = 'Badge';
