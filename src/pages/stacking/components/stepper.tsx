import React, { FC } from 'react';

import { Button, ButtonProps } from '@leather.io/ui';
import { Box, BoxProps, Flex, styled } from 'leather-styles/jsx';

import { DecrementIcon } from '@components/icons/decrement';
import { IncrementIcon } from '@components/icons/increment';
import { decrement, increment } from '@utils/mutate-numbers';
import { formatCycles } from '@utils/stacking';

interface StepperProps extends BoxProps {
  amount: number;

  onIncrement(amount: number): void;

  onDecrement(amount: number): void;
}

const ChangeStepButton: FC<ButtonProps> = ({ children, ...props }) => (
  <Button
    width="52px"
    height="48px"
    variant="ghost"
    outline={0}
    zIndex={1}
    _focus={{
      borderColor: '#C5CCFF',
      boxShadow: '0 0 0 3px rgba(170,179,255,0.75)',
    }}
    {...props}
  >
    {children}
  </Button>
);

export const Stepper: FC<StepperProps> = props => {
  const { amount, onIncrement, onDecrement, ...rest } = props;
  return (
    <Box {...rest}>
      <Flex
        display={'inline-flex'}
        border={'1px solid'}
        borderColor={'ink.border-default'}
        borderRadius={'sm'}
      >
        <ChangeStepButton
          color={amount === 1 ? 'ink.text-subdued' : 'ink.action-primary-default'}
          pointerEvents={amount === 1 ? 'none' : 'all'}
          onClick={() => onDecrement(decrement(amount))}
          borderRadius="6px 0 0 6px"
        >
          <DecrementIcon />
        </ChangeStepButton>
        <Flex flexDirection="column" justifyContent="center" alignItems="center" minWidth="100px">
          <styled.span textStyle="body.small" mb="3px" mx="base">
            {formatCycles(amount)}
          </styled.span>
        </Flex>
        <ChangeStepButton
          color={amount === 12 ? 'ink.text-subdued' : 'ink.action-primary-default'}
          pointerEvents={amount === 12 ? 'none' : 'all'}
          onClick={() => onIncrement(increment(amount))}
          borderRadius="0 6px 6px 0"
        >
          <IncrementIcon />
        </ChangeStepButton>
      </Flex>
    </Box>
  );
};
