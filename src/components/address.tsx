import { useClipboard } from '@stacks/ui';
import { IconCopy } from '@tabler/icons-react';
import { Box, Flex, styled } from 'leather-styles/jsx';

import { truncateMiddle } from '@utils/tx-utils';

interface AddressArgs {
  address: string;
}
export function Address({ address }: AddressArgs) {
  const { onCopy } = useClipboard(address);
  return (
    <Flex alignItems="center">
      <styled.p mr="space.02" textStyle="label.02">
        {truncateMiddle(address)}
      </styled.p>
      <Box onClick={onCopy} display="inline-block" cursor="pointer">
        <IconCopy size={14} />
      </Box>
    </Flex>
  );
}
