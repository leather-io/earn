import {
  IconAlarm,
  IconAlertCircle,
  IconAlertCircleFilled,
  IconAlertTriangleFilled,
  IconArrowUpRight,
} from '@tabler/icons-react';
import { Box, Flex, styled } from 'leather-styles/jsx';

import { useGlobalContext } from '../context/use-app-context';

export function Banner() {
  return (
    <Box width="100%" background="ink.text-non-interactive">
      <Flex
        maxWidth="1216px"
        mx="auto"
        minHeight="72px"
        py="space.04"
        px={['space.04', 'space.04', 'space.05']}
        alignItems="center"
        justifyContent="center"
      >
        <Flex gap="space.03" alignItems="center">
          <styled.span textStyle="body.02" fontSize="13px" fontWeight="400">
            Lockstacks is now Leather Earn — Our new home for all your earning and stacking needs.
          </styled.span>
        </Flex>
      </Flex>
    </Box>
  );
}
