import React from 'react';

import { Box, BoxProps, Flex, styled } from 'leather-styles/jsx';
import { token } from 'leather-styles/tokens';

interface CardProps extends BoxProps {
  title?: string;
}

export function Card({ title, children, ...rest }: CardProps) {
  return (
    <Box
      style={{
        border: '1px solid',
        borderColor: token('borders.subdued'),
        width: '100%',
        textAlign: 'center',
        minHeight: '600px',
        backgroundColor: token('colors.ink.background-primary'),
      }}
      {...rest}
    >
      {title && (
        <Flex
          borderBottom="1px solid"
          borderColor="ink.border-default"
          justifyContent="center"
          alignItems="center"
        >
          <styled.p textStyle="body.01" style={{ color: token('colors.ink.text-primary') }}>
            {title}
          </styled.p>
        </Flex>
      )}
      <Box my="space.02" mx="space.04">
        {children}
      </Box>
    </Box>
  );
}
