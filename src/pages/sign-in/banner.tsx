import { Box, color } from '@stacks/ui';

export function Banner() {
  return (
    <Box
      color={color('text-caption')}
      backgroundColor={color('bg')}
      fontSize="12px"
      textAlign="center"
      px="24px"
      py="8px"
    >
      This website provides the interface to connect with the Stacking protocol or delegate to a
      Stacking pool provider directly. We don&apos;t provide the Stacking service ourselves.
    </Box>
  );
}
