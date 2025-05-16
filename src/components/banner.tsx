import { Link } from '@leather.io/ui';
import { Box, Flex } from 'leather-styles/jsx';

export function Banner() {
  return (
    <Box width="100%" background="ink.text-non-interactive">
      <Flex
        maxWidth="1216px"
        mx="auto"
        py="space.03"
        px={['space.04', 'space.04', 'space.05']}
        alignItems="center"
        justifyContent="center"
      >
        <Link
          textStyle="body.02"
          fontSize="13px"
          fontWeight="400"
          href="https://app.leather.io/stacking"
        >
          Try out our new stacking experience
        </Link>
      </Flex>
    </Box>
  );
}
