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
    <Flex alignItems="center" flex="1 1 100%">
      <Link to={`/${createSearch(activeNetwork)}`}>
        <Flex alignItems="center">
          <Logo />
        </Flex>
      </Link>
    </Flex>
  );
};

const NavbarRight = () => {
  const { isSignedIn, signOut, signIn, address } = useAuth();
  const [isHovered, bind] = useHover();
  return (
    <Flex justify="right" alignItems="center" justifyItems={'flex-end'}>
      {isSignedIn && <NetworkInfo />}
      <styled.a
        style={{ color: token('colors.ink.background-primary'), cursor: 'pointer' }}
        onClick={() => openExternalLink('https://wallet.hiro.so/wallet/faq#stacking')}
        mx="space.04"
      >
        FAQ
      </styled.a>
      <Box pr="12px">
        {isSignedIn && address ? (
          <Button
            width="160px"
            mr="space.00"
            boxShadow="none"
            variant="outline"
            _hover={{ boxShadow: 'none' }}
            onClick={() => signOut()}
            borderRadius="6px"
            background={'ink.background-primary'}
            {...bind}
          >
            {isHovered ? 'Sign out' : truncateMiddle(address)}
          </Button>
        ) : (
          <Button
            boxShadow="none"
            _hover={{ boxShadow: 'none' }}
            width="160px"
            variant="outline"
            borderRadius="6px"
            background={'ink.background-primary'}
            onClick={() => signIn()}
          >
            Connect Leather
          </Button>
        )}
      </Box>
    </Flex>
  );
};
