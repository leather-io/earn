import { Flex } from 'leather-styles/jsx';
import { token } from 'leather-styles/tokens';
import { useGlobalContext } from 'src/context/use-app-context';

import { Link } from '@components/link';
import { figmaTheme } from '@constants/figma-theme';
import { createSearch } from '@utils/networks';

import { OpenLinkInNewTab } from './open-link-in-new-tab';

export function Footer() {
  const { activeNetwork } = useGlobalContext();
  return (
    <Flex
      flexDirection={['column', 'column', 'row', 'row']}
      justifyContent="center"
      alignItems="center"
      minHeight="100px"
      px={['space.04', 'space.04', 'space.02', 'space.02']}
      borderTop={`1px solid ${figmaTheme.borderSubdued}`}
      columnGap="space.04"
    >
      <Link
        style={{
          color: token('colors.ink.text-primary'),
        }}
        textDecoration="underline"
        fontWeight={500}
        to={`/pool-admin${createSearch(activeNetwork)}`}
      >
        Pool Administration
      </Link>
      <Link
        style={{
          color: token('colors.ink.text-primary'),
        }}
        textDecoration="underline"
        fontWeight={500}
        to={`/signer/generate-signature${createSearch(activeNetwork)}`}
      >
        Signer Key Signature
      </Link>
      <OpenLinkInNewTab
        style={{
          color: token('colors.ink.text-primary'),
        }}
        fontWeight={500}
        href="https://leather.io/terms"
      >
        Terms of Service
      </OpenLinkInNewTab>
      <OpenLinkInNewTab
        style={{
          color: token('colors.ink.text-primary'),
        }}
        fontWeight={500}
        href="https://leather.io/privacy-policy"
      >
        Privacy Policy
      </OpenLinkInNewTab>
    </Flex>
  );
}
