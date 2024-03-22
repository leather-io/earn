import { BoxProps, Text, color } from '@stacks/ui';

export function StackingDescription({ children, ...props }: BoxProps) {
  return (
    <Text textStyle="body.large" display="block" color={color('text-caption')} {...props}>
      {children}
    </Text>
  );
}
