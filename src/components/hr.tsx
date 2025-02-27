import { Box, BoxProps } from 'leather-styles/jsx';

export function Hr(props: BoxProps) {
  return (
    <Box height="1px" mb="space.06" width="100%" backgroundColor="ink.border-default" {...props} />
  );
}
