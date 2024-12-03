import { Box, BoxProps } from 'leather-styles/jsx';

interface StackingUserConfirmProps extends Omit<BoxProps, 'onChange'> {
  onChange(userConfirmed: boolean): void;
}

export function StackingUserConfirm(props: StackingUserConfirmProps) {
  const { onChange, ...rest } = props;
  return (
    <Box
      display="block"
      py="space.04"
      textStyle="label.01"
      color="ink.text-primary"
      userSelect="none"
      {...rest}
    >
      <Box mr="space.02" display="inline-block">
        <input type="checkbox" onChange={e => onChange(e.target.checked)} />
      </Box>
      I have read and understand the above
    </Box>
  );
}
