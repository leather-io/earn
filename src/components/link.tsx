import { Link as ReactRouterLink } from 'react-router-dom';

import { Box, BoxProps } from 'leather-styles/jsx';

interface Props extends BoxProps {
  to: string;
}

export function Link({ to, children, ...props }: Props) {
  return (
    <Box
      display="inline"
      cursor="pointer"
      outline={0}
      color="ink.text-primary"
      _hover={{ textDecoration: 'underline' }}
      _focus={{ textDecoration: 'underline' }}
      {...props}
    >
      <ReactRouterLink to={to}>{children}</ReactRouterLink>
    </Box>
  );
}
