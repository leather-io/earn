import React from 'react';

import { BoxProps, styled } from 'leather-styles/jsx';

export const ErrorText: React.FC<BoxProps> = ({ children, ...rest }) => (
  <styled.span
    textAlign="left"
    lineHeight="16px"
    display="block"
    textStyle="caption"
    color="red.action-primary-default"
    {...rest}
  >
    {children}
  </styled.span>
);
