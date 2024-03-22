import { Flex, color } from '@stacks/ui';
import { useGlobalContext } from 'src/context/use-app-context';

import { figmaTheme } from '@constants/figma-theme';
import { createSearch } from '@utils/networks';

import { OpenLinkInNewTab } from './open-link-in-new-tab';

export function Footer() {
  const { activeNetwork } = useGlobalContext();
  return (
    <Flex
      flexDirection="row"
      justifyContent="center"
      p="tight"
      borderTop={`1px solid ${figmaTheme.borderSubdued}`}
      columnGap="loose"
    >
      <OpenLinkInNewTab
        color={color('text-caption')}
        fontWeight={500}
        sx={{ textDecoration: 'underline' }}
        href={`${window.location.origin}/pool-admin${createSearch(activeNetwork)}`}
      >
        Pool Administration
      </OpenLinkInNewTab>
      <OpenLinkInNewTab
        color={color('text-caption')}
        fontWeight={500}
        sx={{ textDecoration: 'underline' }}
        href={`${window.location.origin}/signer/generate-signature${createSearch(activeNetwork)}`}
      >
        Signer Key Signature
      </OpenLinkInNewTab>
    </Flex>
  );
}
