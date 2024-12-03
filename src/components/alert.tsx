import { ReactNode } from 'react';
import { FiInfo } from 'react-icons/fi';

import { Box, Flex, styled } from 'leather-styles/jsx';
import { token } from 'leather-styles/tokens';

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
    <Box
      style={{ backgroundColor: token('colors.ink.background-secondary') }}
      py="space.04"
      px="space.04"
      borderRadius="4px"
    >
      <Flex>
        <Box mr="space.02" mt="2px">
          {icon ?? <FiInfo color={token('colors.ink.background-primary')} />}
        </Box>
        <Box>
          {title && <styled.p textStyle="heading.01">{title}</styled.p>}
          {body && bodyEl}
        </Box>
      </Flex>
    </Box>
  );
}

export function AlertText({ children }: { children?: ReactNode }) {
  return (
    <styled.a
      textStyle="body.01"
      style={{ color: token('colors.ink.background-primary') }}
      lineHeight="22px"
      mt="extra-tight"
    >
      {children}
    </styled.a>
  );
}
