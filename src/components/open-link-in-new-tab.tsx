import { Box, BoxProps, styled } from 'leather-styles/jsx';

import { openExternalLink } from '@utils/external-links';
import { css } from 'leather-styles/css';

interface Props extends BoxProps {
  href: string;
}

export function OpenLinkInNewTab({ href, children, ...props }: Props) {
  const openUrl = () => openExternalLink(href);
  return (
    <Box
      className={css({
        cursor: 'pointer',
        _hover: {
          textDecoration: 'underline',
        },
        display: 'flex',
        outline: 0,
      })}
      {...props}
    >
      <styled.a onClick={openUrl}>{children}</styled.a>
    </Box>
  );
}
