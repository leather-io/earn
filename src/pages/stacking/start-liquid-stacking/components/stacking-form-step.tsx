import { FC, ForwardRefExoticComponent, forwardRef } from 'react';

import { Button, ButtonProps } from '@leather.io/ui';
import { Box, Flex, FlexProps } from 'leather-styles/jsx';

import { Title } from '@components/title';

interface StackingFormStepProps extends FlexProps {
  title: string;
}

export const StackingStep: FC<StackingFormStepProps> = props => {
  const { title, children, ...rest } = props;
  return (
    <Flex flexDirection="column" mt="space.05" {...rest}>
      <Title fontSize="24px" mt="space.01" mr="space.03">
        {title}
      </Title>
      <Box>{children}</Box>
    </Flex>
  );
};

export const StackingStepAction: ForwardRefExoticComponent<ButtonProps> = forwardRef<
  HTMLButtonElement,
  ButtonProps
>(({ children, ...props }, ref) => (
  <Button size="md" mt="space.05" ref={ref} {...props}>
    {children}
  </Button>
));

StackingStepAction.displayName = 'StackingStepAction';
