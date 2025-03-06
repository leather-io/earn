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
    <Flex flexDirection="column" mt="extra-loose" {...rest}>
      <Title fontSize="24px" mt="extra-tight" mr="tight">
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
  <Button size="md" mt="loose" ref={ref} {...props}>
    {children}
  </Button>
));

StackingStepAction.displayName = 'StackingStepAction';
