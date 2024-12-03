import { useClipboard } from '@stacks/ui';
import { IconCopy } from '@tabler/icons-react';
import { Box, styled } from 'leather-styles/jsx';

import { truncateMiddle } from '@utils/tx-utils';

interface AddressArgs {
  address: string;
}
export function Address({ address }: AddressArgs) {
  const { onCopy } = useClipboard(address);
  return (
    <>
      <styled.p textStyle="label.02">{truncateMiddle(address)}</styled.p>&nbsp;
      <Box onClick={onCopy} display="inline-block" cursor="pointer">
        <IconCopy size={14} />
      </Box>
    </>
  );
}
