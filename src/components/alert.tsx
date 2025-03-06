import { ReactNode } from 'react';

import { IconInfoCircle } from '@tabler/icons-react';
import { Box, Flex, styled } from 'leather-styles/jsx';

interface Props {
  title?: ReactNode;
  children?: ReactNode;
  icon?: ReactNode;
}
export function Alert({ title, children: body, icon }: Props) {
  let bodyEl = undefined;

  if (typeof body === 'string') {
    bodyEl = <AlertText>{body}</AlertText>;
  } else {
    bodyEl = body;
  }
  return (
    <Box backgroundColor="ink.background-primary" py="space.04" px="space.04" borderRadius="4px">
      <Flex>
        <Box mr="space.02" mt="2px">
          {icon ?? <IconInfoCircle />}
        </Box>
        <Box>
          {title && <styled.p textStyle="heading.04">{title}</styled.p>}
          {body && bodyEl}
        </Box>
      </Flex>
    </Box>
  );
}

export function AlertText({ children }: { children?: ReactNode }) {
  return (
    <styled.a textStyle="body.01" lineHeight="22px" mt="extra-tight">
      {children}
    </styled.a>
  );
}
