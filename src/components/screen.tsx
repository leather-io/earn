import React, { FC } from 'react';

import { Flex, FlexProps } from 'leather-styles/jsx';

type ScreenProps = FlexProps;

export const Screen: FC<ScreenProps> = props => (
  <Flex
    flexDirection="column"
    maxWidth="1216px"
    mb="space.05"
    mx={['space.04', 'space.04', 'space.05', 'space.05', 'auto']}
    {...props}
  />
);
