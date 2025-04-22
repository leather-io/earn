import { ReactNode, createContext, useContext, useEffect, useState } from 'react';

import { makeUUID4 } from '@stacks/common';
import {
  DEFAULT_PROVIDERS,
  StorageData,
  connect,
  disconnect,
  getLocalStorage,
  isConnected,
} from '@stacks/connect';
import { NetworkString } from '@stacks/connect/dist/types/methods';
import { validateStacksAddress as isValidStacksAddress } from '@stacks/transactions';
import useLocalStorage from 'use-local-storage';

import { useStacksNetwork } from '@hooks/use-stacks-network';
import { analytics } from '@utils/analytics';

type AuthData = Pick<StorageData, 'addresses'>;

/**
 * NOTE: For security reasons, the `8.x.x` release only returns
 * the current network's address (where previously both mainnet and testnet addresses were returned).
 * @see https://github.com/hirosystems/connect/tree/main/packages/connect
 */
function getAccountAddresses(authData: AuthData | null) {
  const address = authData?.addresses?.stx?.find(stx => stx.symbol === 'STX')?.address ?? null;
  const btcAddressP2tr =
    authData?.addresses?.btc?.find(btc => ('type' in btc ? btc.type === 'p2tr' : false))?.address ??
    null;
  const btcAddressP2wpkh =
    authData?.addresses?.btc?.find(btc => ('type' in btc ? btc.type === 'p2wpkh' : false))
      ?.address ?? null;

  if (!address || !isValidStacksAddress(address)) {
    return { address: null, btcAddressP2tr: null, btcAddressP2wpkh: null };
  }

  return { address, btcAddressP2tr, btcAddressP2wpkh };
}

function getAuthData() {
  try {
    const connected = isConnected();
    if (connected) {
      return getLocalStorage();
    }
  } catch {
    // do nothing
  }
  return null;
}

interface SignInOptions {
  allowAllProviders?: boolean;
}

interface AuthContext {
  isSigningIn: boolean;
  isSignedIn: boolean;
  signIn(options: SignInOptions): void;
  signOut(): void;
  address: string | null;
  btcAddressP2tr: string | null;
  btcAddressP2wpkh: string | null;
}

// The context type is non-null to avoid null checks wherever the context is used.
// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const AuthContext = createContext<AuthContext>(null!);

interface Props {
  children: ReactNode;
}

export function AuthProvider({ children }: Props) {
  const [isSigningIn, setIsSigningIn] = useState(false);
  const { networkName } = useStacksNetwork();

  const [savedNetworkName, setSavedNetworkName] = useLocalStorage<NetworkString | undefined>(
    'earn/auth/savedNetworkName',
    undefined,
    { syncData: false }
  );

  const [authData, setAuthData] = useState<AuthData | null>(getAuthData);

  async function signIn({ allowAllProviders }: SignInOptions) {
    if (isSigningIn) {
      console.warn('Attempted to sign in while sign is is in progress.');
      return;
    }
    setIsSigningIn(true);

    const providers = DEFAULT_PROVIDERS.filter(provider => {
      if (allowAllProviders) return true;
      return provider.id === 'LeatherProvider';
    });
    const providerNames = providers.map(provider => provider.name).join(',');

    analytics.untypedTrack('earn_sign_in_started', { provider: providerNames });
    console.log({ providerNames });

    try {
      // same as connect, but allows set forceWalletSelect
      await connect({
        defaultProviders: providers,
        network: networkName,
        enableLocalStorage: true,
      });
      analytics.untypedTrack('earn_sign_in_completed', { provider: providerNames });
      setAuthData(getAuthData());
      setSavedNetworkName(networkName);
    } catch (error) {
      console.error(error);
      analytics.untypedTrack('earn_sign_in_cancelled', { provider: providerNames });
    } finally {
      setIsSigningIn(false);
    }
  }

  function signOut() {
    disconnect();
    setAuthData(null);
    setSavedNetworkName(undefined);
  }

  function completeZealyConnectTask() {
    const { address } = getAccountAddresses(authData);
    if (networkName === 'mainnet') {
      fetch('https://api.leather.io/v1/quests/connect-earn/complete', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-client-id': makeUUID4(),
        },
        body: JSON.stringify({
          address,
        }),
      });
    }
  }

  useEffect(() => {
    const connected = isConnected();

    if (connected) {
      completeZealyConnectTask();
    }

    // TODO: is there a better way to force @stacks/connect update network?
    if (connected && savedNetworkName && networkName !== savedNetworkName) {
      signOut();
      signIn({ allowAllProviders: true });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [networkName, savedNetworkName]);

  const { address, btcAddressP2tr, btcAddressP2wpkh } = getAccountAddresses(authData);
  return (
    <>
      <AuthContext.Provider
        value={{
          isSigningIn,
          isSignedIn: Boolean(authData),
          signIn,
          signOut,
          address,
          btcAddressP2tr,
          btcAddressP2wpkh,
        }}
      >
        {children}
      </AuthContext.Provider>
    </>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
