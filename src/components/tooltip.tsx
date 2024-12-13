import React, { FC, ReactNode } from 'react';

import Tippy from '@tippyjs/react';
import { Box, BoxProps } from 'leather-styles/jsx';

import { ExplainerIcon } from './icons/explainer';

interface TooltipProps extends BoxProps {
  text: string;
}

export const Tooltip: FC<TooltipProps> = ({ children, text, ...props }) => {
  return (
    <Tippy
      zIndex={9999999}
      content={
        <Box
          px="space.02"
          py="space.01"
          color="ink.background-primary"
          background="ink.text-primary"
          borderRadius="6px"
          textStyle="caption.01"
          whiteSpace="normal"
        >
          {text}
        </Box>
      }
    >
      <Box {...props}>{children}</Box>
    </Tippy>
  );
};

interface ExplainerLabelProps {
  text: string;
  children: ReactNode;
}

export const ExplainerLabel: FC<ExplainerLabelProps> = ({ text, children }) => (
  <>
    {' '}
    <Tooltip
      text={text}
      textDecoration="underline"
      style={{ textDecorationStyle: 'dotted' }}
      cursor="help"
    >
      {children}
    </Tooltip>{' '}
  </>
);

export const ExplainerTooltip: FC<BoxProps> = ({ children, ...props }) => {
  return (
    <Tippy
      zIndex={9999999}
      content={
        <Box
          p="space.02"
          color="white"
          background="black"
          borderRadius="2px"
          textStyle="body.01"
          whiteSpace="normal"
          maxWidth="290px"
          {...props}
        >
          {children}
        </Box>
      }
    >
      <Box mr="space.01">
        <ExplainerIcon cursor="help" />
      </Box>
    </Tippy>
  );
};
