import { Link } from 'react-router-dom';

import { Button } from '@leather.io/ui';
import { css } from 'leather-styles/css';
import { Box, Flex, styled } from 'leather-styles/jsx';
import { token } from 'leather-styles/tokens';
import { useGlobalContext } from 'src/context/use-app-context';
import { useHover } from 'use-events';

import { openExternalLink } from '@utils/external-links';
import { createSearch } from '@utils/networks';
import { truncateMiddle } from '@utils/tx-utils';

import Logo from '../assets/images/logo.svg';
import { useAuth } from './auth-provider/auth-provider';
import { NetworkInfo } from './network-info';

interface NavItemProps {
  href: string;
  children: React.ReactNode;
  openInNewTab?: boolean;
  isActive?: boolean;
}

const navItemStyles = css({
  color: token('colors.ink.background-primary'),
  cursor: 'pointer',
  textDecoration: 'none',
  _hover: {
    textDecoration: 'underline',
  },
});

function NavItem({ href, children, openInNewTab = false, isActive = false }: NavItemProps) {
  return (
    <styled.a
      color="ink.background-primary"
      href={href}
      className={navItemStyles}
      target={openInNewTab ? '_blank' : undefined}
      rel={openInNewTab ? 'noopener noreferrer' : undefined}
      textDecoration={isActive ? 'underline' : 'none'}
      onClick={
        openInNewTab
          ? e => {
              e.preventDefault();
              openExternalLink(href);
            }
          : undefined
      }
    >
      {children}
    </styled.a>
  );
}

export function Navbar() {
  return (
    <Box
      style={{ background: token('colors.ink.text-primary') }}
      className={css({
        width: '100%',
      })}
    >
      <Flex
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Flex
          flex={1}
          style={{
            justifyContent: 'center',
            maxWidth: '1400px',
            height: '80px',
          }}
        >
          <Flex
            flexDirection="row"
            alignItems="center"
            className={css({ width: { base: '100%', smToXl: '94%' } })}
          >
            <NavbarLeft />
            <NavbarRight />
          </Flex>
        </Flex>
      </Flex>
    </Box>
  );
}

const NavbarLeft = () => {
  const { activeNetwork } = useGlobalContext();

  return (
    <Flex alignItems="center" flex="flex-start">
      <Link to={`/${createSearch(activeNetwork)}`}>
        <Flex alignItems="center">
          <Logo />
        </Flex>
      </Link>
    </Flex>
  );
};

const NavbarRight = () => {
  const { isSignedIn, address, signOut, signIn } = useAuth();
  const [isHovered, bind] = useHover();

  return (
    <Flex
      flex="1 1 100%"
      justify="right"
      alignItems="center"
      gap="space.05"
      justifyItems={'flex-end'}
    >
      <NavItem href="https://earn.leather.io/" isActive>
        Earn
      </NavItem>
      <NavItem href="https://leather.io/blog">Blog</NavItem>
      <NavItem href="https://leather.io/learn">Learn</NavItem>
      <NavItem href="https://leather.io/guides">Guides</NavItem>
      <NavItem href="https://leather.io/developer-docs">Developer docs</NavItem>
      <NavItem href="https://leather.io/frequent-questions#stacking">FAQs</NavItem>
      {isSignedIn && <NetworkInfo />}
      <Box pr="12px">
        {isSignedIn && address ? (
          <Button
            variant="outline"
            _hover={{ boxShadow: 'none' }}
            onClick={() => signOut()}
            borderRadius="xs"
            background={'ink.background-primary'}
            {...bind}
          >
            {isHovered ? 'Sign out' : truncateMiddle(address)}
          </Button>
        ) : (
          <Button
            boxShadow="none"
            width="160px"
            variant="outline"
            borderRadius="xs"
            background="#f6f1ee"
            transition="background 0.2s ease-in-out"
            _hover={{
              boxShadow: 'none',
              background: 'ink.background-primary',
            }}
            onClick={() => signIn()}
          >
            Connect Wallet
          </Button>
        )}
      </Box>
    </Flex>
  );
};
