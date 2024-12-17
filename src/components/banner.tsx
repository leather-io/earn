import { InfoCircleIcon } from '@leather.io/ui';
import { css } from 'leather-styles/css';
import { Box, Flex, styled } from 'leather-styles/jsx';

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
        <Flex gap="space.01" alignItems="center">
          <InfoCircleIcon className={css({ minWidth: '14px', height: '14px' })} />
          <styled.span textStyle="body.02" fontSize="13px" fontWeight="400">
            Lockstacks is now Leather Earn
          </styled.span>
        </Flex>
      </Flex>
    </Box>
  );
}
