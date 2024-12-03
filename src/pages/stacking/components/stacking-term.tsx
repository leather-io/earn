import { ReactNode } from 'react';

import { styled, Flex, FlexProps, Stack } from 'leather-styles/jsx';

export interface StackingTermItem extends FlexProps {
  title: string;
  icon: ReactNode;
}
export function StackingTermItem(props: StackingTermItem) {
  const { title, icon, children, ...rest } = props;
  return (
    <Flex alignItems="flex-start" {...rest}>
      <Flex width="16px" ml="space.04" mr="space.02" pt="space.01">
        {icon}
      </Flex>
      <Stack mt="space.00">
        <styled.h3 textStyle="heading.06" fontWeight="bold">
          {title}
        </styled.h3>
        <Stack mb="space.02" textStyle="body.02" color="ink.text">
          {children}
        </Stack>
      </Stack>
    </Flex>
  );
}
