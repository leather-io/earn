import { useState } from 'react';
import { FiMenu, FiX } from 'react-icons/fi';

import { Button } from '@leather.io/ui';
import { css } from 'leather-styles/css';
import { Box, Flex, styled } from 'leather-styles/jsx';
import { token } from 'leather-styles/tokens';
import { useHover } from 'use-events';

import { openExternalLink } from '@utils/external-links';
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
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { isSignedIn, address, signOut, signIn } = useAuth();
  const [isHovered, bind] = useHover();

  return (
    <>
      <Box
        style={{ background: token('colors.ink.text-primary') }}
        className={css({
          width: '100%',
          position: 'relative',
          zIndex: 1000,
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
              width="100%"
              px={{ base: 'space.04', md: 'space.06', '2xl': '0' }}
              justify="space-between"
            >
              <NavbarLeft />

              <Box display={{ base: 'none', lg: 'block' }} flex={1}>
                <NavLinks />
              </Box>

              <Flex gap="space.04" alignItems="center" ml={{ lg: 'space.06' }}>
                {isSignedIn && (
                  <Box display={{ base: 'none', md: 'block' }}>
                    <NetworkInfo />
                  </Box>
                )}
                <Box display={{ base: 'none', md: 'block' }}>
                  {isSignedIn && address ? (
                    <Button
                      variant="outline"
                      _hover={{
                        boxShadow: 'none',
                      }}
                      onClick={() => signOut()}
                      borderRadius="xs"
                      background={'ink.background-primary'}
                      fontSize="13px"
                      width="18ch"
                      {...bind}
                    >
                      {isHovered ? 'Sign out' : truncateMiddle(address)}
                    </Button>
                  ) : (
                    <Button
                      boxShadow="none"
                      variant="outline"
                      borderRadius="xs"
                      background="#f6f1ee"
                      transition="background 0.2s ease-in-out"
                      _hover={{
                        boxShadow: 'none',
                        background: '#ede3dd',
                      }}
                      onClick={() => signIn({ allowAllProviders: true })}
                    >
                      Connect Wallet
                    </Button>
                  )}
                </Box>
                <Box display={{ base: 'block', lg: 'none' }}>
                  <Button
                    variant="outline"
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    color="ink.background-primary"
                    background="transparent"
                    border="none"
                    p={0}
                    _hover={{
                      background: 'transparent',
                      boxShadow: 'none',
                    }}
                  >
                    {isMobileMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
                  </Button>
                </Box>
              </Flex>
            </Flex>
          </Flex>
        </Flex>
      </Box>

      {/* Full-screen mobile menu */}
      <Box
        position="fixed"
        top="80px"
        left={0}
        right={0}
        bottom={0}
        bg="rgba(4, 4, 4, 0.95)"
        zIndex={999}
        display={{ base: isMobileMenuOpen ? 'block' : 'none', lg: 'none' }}
        backdropFilter="blur(4px)"
      >
        <Flex flexDirection="column" gap="space.04" p="space.06" height="100%">
          <NavLinks />
        </Flex>
      </Box>
    </>
  );
}

const NavbarLeft = () => {
  return (
    <Flex alignItems="center">
      <styled.a
        href="https://leather.io"
        onClick={e => {
          e.preventDefault();
          window.location.href = 'https://leather.io';
        }}
      >
        <Flex alignItems="center">
          <Logo />
        </Flex>
      </styled.a>
    </Flex>
  );
};

const NavLinks = () => {
  return (
    <Flex
      flex="1"
      flexDirection={{ base: 'column', lg: 'row' }}
      justify={{ lg: 'flex-end' }}
      alignItems={{ base: 'flex-start', lg: 'center' }}
      gap="space.05"
    >
      <NavItem href="https://earn.leather.io/" isActive>
        Earn
      </NavItem>
      <NavItem href="https://leather.io/blog">Blog</NavItem>
      <NavItem href="https://leather.io/learn">Learn</NavItem>
      <NavItem href="https://leather.io/guides">Guides</NavItem>
      <NavItem href="https://leather.io/developer-docs">Developer docs</NavItem>
      <NavItem href="https://leather.io/frequent-questions#stacking">FAQs</NavItem>
    </Flex>
  );
};
