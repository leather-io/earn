import { IconStairs } from '@tabler/icons-react';
import { Avatar, Box, Flex, Title, Text } from '@mantine/core';
import { toHumanReadableStx } from '@utils/unit-convert';

interface EstimatedMinimumLabelProps {
  /**
   * Extimated amount of uSTX needed to start stacking.
   */
  estimatedStackingMinimum: bigint;
}
export function EstimatedMinimumLabel({ estimatedStackingMinimum }: EstimatedMinimumLabelProps) {
  return (
    <Flex gap="sm">
      <Avatar radius="xl">
        <IconStairs />
      </Avatar>
      <Box>
        <Title order={4}>Estimated minimum</Title>
        <Text>{toHumanReadableStx(estimatedStackingMinimum)}</Text>
      </Box>
    </Flex>
  );
}
