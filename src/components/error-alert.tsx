import { ReactNode } from 'react';

import { ErrorCircleIcon } from '@leather.io/ui';
import { token } from 'leather-styles/tokens';
import { Box, Flex } from 'leather-styles/jsx';

interface Props {
  id?: string;
  children?: ReactNode;
}
export function ErrorAlert({ id, children }: Props) {
  return (
    <Box
      bg={token('colors.red.background-primary')}
      title={`Error ${id ? id : ''}`}
      color={token('colors.ink.text-primary')}
      px="space.04"
    >
      <Flex flexDirection="row" alignItems="center">
        <ErrorCircleIcon variant="small" />
        <Box width="4px" />
        {children}
      </Flex>
    </Box>
  );
}
