import React, { cloneElement, isValidElement } from 'react';

import { Box, BoxProps } from 'leather-styles/jsx';

import { increment } from '@utils/mutate-numbers';

interface ChildProps extends BoxProps {
  step: number;
}

export type StackingFormChild = React.ReactElement<ChildProps> | null;

interface Props {
  children: StackingFormChild | StackingFormChild[];
}

export function StackingFormContainer({ children }: Props) {
  const parsedChildren = Array.isArray(children) ? children : [children];
  const parsedFormSteps = parsedChildren.flatMap((child, index) => {
    if (!isValidElement(child)) return null;
    return [
      cloneElement(child, {
        key: index,
        step: increment(index),
        mb: increment(index) === parsedChildren.length ? '280px' : undefined,
      }),
    ];
  });
  return <Box mt="48px">{parsedFormSteps}</Box>;
}
