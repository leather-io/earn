import { ReactNode } from 'react';

import { ErrorCircleIcon } from '@leather.io/ui';
import { css } from 'leather-styles/css';
import { Box, Flex } from 'leather-styles/jsx';

interface Props {
  id?: string;
  children?: ReactNode;
}
export function ErrorAlert({ id, children }: Props) {
  return (
    <Box title={`Error ${id ? id : ''}`} bg="red.background-primary" my="space.04">
      <Flex flexDirection="row" alignItems="center" p="space.04">
        <ErrorCircleIcon variant="small" className={css({ color: 'red/80' })} />
        <Box mr="space.02" />
        {children}
      </Flex>
    </Box>
  );
}
