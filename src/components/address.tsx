import { Box, Text, useClipboard } from '@stacks/ui';
import { IconCopy } from '@tabler/icons-react';

import { truncateMiddle } from '@utils/tx-utils';
import { Tooltip } from './tooltip';

interface AddressArgs {
  address: string;
}
export function Address({ address }: AddressArgs) {
  const { onCopy, hasCopied } = useClipboard(address);
  return (
    <>
      <Text>{truncateMiddle(address)}</Text>&nbsp;
      <Box onClick={onCopy} display="inline-block" sx={{ cursor: 'pointer' }}>
        <Tooltip text={hasCopied ? 'copied!' : 'copy'}>
          <IconCopy size={14} />
        </Tooltip>
      </Box>
    </>
  );
}
