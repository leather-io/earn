import { ReactNode, createContext, useContext, useState } from 'react';

import { UserData } from '@stacks/auth';
import {
  AppConfig,
  AuthOptions,
  DEFAULT_PROVIDERS,
  UserSession,
  disconnect,
  showConnect,
} from '@stacks/connect';
import { validateStacksAddress as isValidStacksAddress } from '@stacks/transactions';
import { APP_DETAILS } from 'src/constants';

import { useStacksNetwork } from '@hooks/use-stacks-network';
import { analytics } from '@utils/analytics';

const appConfig = new AppConfig(['store_write']);
const userSession = new UserSession({ appConfig });

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function getAccountAddresses(userData: any, network: string) {
  // NOTE: Although this approach to obtain the user's address is good enough for now, it is quite brittle.
  // It relies on a variable having the same value as the object key below. Type checking is not available given the `userSession` object managed by `@stacks/connect` is typed as `any`.
  //
  // Should this be a source of issues, it may be worth refactoring.
  const address: string = userData?.profile?.stxAddress?.[network];
  const btcAddressP2tr: string = userData?.profile?.btcAddress?.p2tr?.[network];
  const btcAddressP2wpkh: string = userData?.profile?.btcAddress?.p2wpkh?.[network];

  if (!isValidStacksAddress(address)) {
    return { address: null, btcAddressP2tr: null, btcAddressP2wpkh: null };
  }
  return { address, btcAddressP2tr, btcAddressP2wpkh };
}

interface SignInOptions {
  allowAllProviders?: boolean;
}

interface AuthContext {
  isSigningIn: boolean;
  isSignedIn: boolean;
  signIn(options?: SignInOptions): void;
  signOut(): void;
  userData: null | UserData;
  address: null | string;
  btcAddressP2tr: null | string;
  btcAddressP2wpkh: null | string;
}

// The context type is non-null to avoid null checks wherever the context is used.
// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const AuthContext = createContext<AuthContext>(null!);

interface Props {
  children: ReactNode;
}
export function AuthProvider({ children }: Props) {
  const [isSigningIn, setIsSigningIn] = useState(false);
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [hasSearchedForExistingSession, setHasSearchedForExistingSession] = useState(false);
  const { networkName } = useStacksNetwork();

  function signIn({ allowAllProviders }: SignInOptions = { allowAllProviders: false }) {
    if (isSigningIn) {
      console.warn('Attempted to sign in while sign is is in progress.');
      return;
    }
    setIsSigningIn(true);

    const provider = window.StacksProvider?.getProductInfo?.()?.name ?? 'none';

    analytics.untypedTrack('earn_sign_in_started', {
      provider,
    });

    showConnect({
      userSession,
      appDetails: APP_DETAILS,
      defaultProviders: DEFAULT_PROVIDERS.filter(provider => {
        if (allowAllProviders) return true;
        return provider.id === 'LeatherProvider';
      }),
      onFinish() {
        const provider = window.StacksProvider?.getProductInfo?.()?.name ?? 'none';
        analytics.untypedTrack('earn_sign_in_completed', {
          provider,
        });
        setIsSigningIn(false);
        setIsSignedIn(true);
      },
      onCancel() {
        analytics.untypedTrack('earn_sign_in_cancelled', {
          provider,
        });
        setIsSigningIn(false);
      },
    } as AuthOptions);
  }

  function signOut() {
    userSession.signUserOut();
    disconnect();
    setIsSignedIn(false);
  }

  if (!hasSearchedForExistingSession) {
    if (userSession.isUserSignedIn()) {
      setIsSignedIn(true);
    }

    setHasSearchedForExistingSession(true);
    return null;
  }

  let userData = null;
  try {
    userData = userSession.loadUserData();
  } catch {
    // do nothing
  }

  const { address, btcAddressP2tr, btcAddressP2wpkh } = getAccountAddresses(userData, networkName);
  return (
    <>
      <AuthContext.Provider
        value={{
          isSigningIn,
          isSignedIn,
          signIn,
          signOut,
          userData,
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
