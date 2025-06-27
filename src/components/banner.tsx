import { Link } from '@leather.io/ui';
import { Box, Flex } from 'leather-styles/jsx';

export function Banner() {
  return (
    <Box width="100%" background="blue.background-secondary">
      <Flex
        maxWidth="1216px"
        mx="auto"
        py="space.03"
        px={['space.04', 'space.04', 'space.05']}
        alignItems="center"
        justifyContent="center"
        textStyle="body.02"
        fontSize="13px"
      >
        Leather Earn is outdated and only supported for a limited time. For the latest version,
        visit{'   '}
        <Link
          ml="space.01"
          fontSize={'inherit'}
          fontWeight="400"
          href="https://app.leather.io/stacking"
        >
          leather.io
        </Link>
      </Flex>
    </Box>
  );
}
