import React, { FC } from 'react';

import { BoxProps, styled } from 'leather-styles/jsx';

type TitleProps = BoxProps;

export const Title: FC<TitleProps> = ({ children, ...props }) => {
  return (
    <styled.h1 textStyle="heading.03" color="ink.text-primary" mb="space.04" {...props}>
      {children}
    </styled.h1>
  );
};
