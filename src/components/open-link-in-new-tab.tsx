import { Box, BoxProps, styled } from 'leather-styles/jsx';
import { token } from 'leather-styles/tokens';

import { openExternalLink } from '@utils/external-links';

interface Props extends BoxProps {
  href: string;
}

export function OpenLinkInNewTab({ href, children, ...props }: Props) {
  const openUrl = () => openExternalLink(href);
  return (
    <Box
      style={{
        color: token('colors.blue.action-primary-default'),
        cursor: 'pointer',
        display: 'flex',
        outline: 0,
        ...props.style,
      }}
      {...props}
    >
      <styled.a onClick={openUrl}>{children}</styled.a>&nbsp;↗
    </Box>
  );
}
