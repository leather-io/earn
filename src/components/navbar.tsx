import { useMemo } from 'react';
import { Link } from 'react-router-dom';

import { Box, Button, Flex, Text, color } from '@stacks/ui';
import { useGlobalContext } from 'src/context/use-app-context';
import { useHover } from 'use-events';

import darkLogo from '@assets/images/logo-dark.svg';
import lightLogo from '@assets/images/logo.svg';
import { createSearch } from '@utils/networks';
import { truncateMiddle } from '@utils/tx-utils';

import { useAuth } from './auth-provider/auth-provider';
import { NetworkInfo } from './network-info';
import { OpenLinkInNewTab } from './open-link-in-new-tab';

export function Navbar() {
  const { isSignedIn, signOut, signIn, address } = useAuth();
  const [isHovered, bind] = useHover();
  const { activeNetwork } = useGlobalContext();

  const logo = useMemo(() => {
    const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    return isDark ? darkLogo : lightLogo;
  }, []);

  return (
    <Flex
      flexDirection="row"
      justifyContent="space-between"
      p="base-loose"
      borderBottom={`1px solid ${color('border')}`}
    >
      <Flex alignItems="center">
        <Link to={`/${createSearch(activeNetwork)}`}>
          <Flex alignItems="center">
            <img src={logo} alt="Site logo with Stacks symbol and Stacking text" />
          </Flex>
        </Link>
      </Flex>
      <Box>
        <Flex p="sm" justify="right" alignItems="center">
          <NetworkInfo />
          <OpenLinkInNewTab href="https://wallet.hiro.so/wallet/faq#stacking" px="loose">
            <Text color={color('text-body')} fontWeight={500}>
              FAQ
            </Text>
          </OpenLinkInNewTab>
          <Box pr="12px">
            {isSignedIn && address ? (
              <Button
                width="160px"
                boxShadow="none"
                _hover={{ boxShadow: 'none' }}
                mode="tertiary"
                onClick={() => signOut()}
                {...bind}
              >
                {isHovered ? 'Sign out' : truncateMiddle(address)}
              </Button>
            ) : (
              <Button
                boxShadow="none"
                _hover={{ boxShadow: 'none' }}
                mode="tertiary"
                onClick={() => signIn()}
              >
                Connect wallet
              </Button>
            )}
          </Box>
        </Flex>
      </Box>
    </Flex>
  );
}
