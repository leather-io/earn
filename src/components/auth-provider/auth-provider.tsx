import { ReactNode, createContext, useContext, useState } from 'react';

import { useStacksNetwork } from '@hooks/use-stacks-network';

import { Address } from '@leather.io/rpc';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function getAccountAddresses(resp: Address[]) {
  const address = resp.find(a => a.symbol === 'STX')?.address || '';
  const btcAddressP2tr = resp.find(a => a.symbol === 'BTC' && a.type === 'p2tr')?.address || '';
  const btcAddressP2wpkh = resp.find(a => a.symbol === 'BTC' && a.type === 'p2wpkh')?.address || '';

  return { address, btcAddressP2tr, btcAddressP2wpkh };
}

interface AuthContext {
  isSigningIn: boolean;
  isSignedIn: boolean;
  signIn(): void;
  signOut(): void;
  address: string;
  btcAddressP2tr: string;
  btcAddressP2wpkh: string;
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

  const [addresses, setAddresses] = useState([] as Address[]);

  async function signIn() {
    if (isSigningIn) {
      console.warn('Attempted to sign in while sign is is in progress.');
      return;
    }
    setIsSigningIn(true);
    const resp = await window.LeatherProvider?.request('getAddresses');

    if (!resp) throw new Error('No addresses found');
    setIsSignedIn(true);
    setAddresses(resp.result.addresses);
  }

  function signOut() {
    setAddresses([]);
    setIsSignedIn(false);
  }

  // TODO: implement session management
  if (!hasSearchedForExistingSession) {
    setHasSearchedForExistingSession(true);
    return null;
  }

  const { address, btcAddressP2tr, btcAddressP2wpkh } = getAccountAddresses(addresses);

  return (
    <>
      <AuthContext.Provider
        value={{
          isSigningIn,
          isSignedIn,
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
  const auth = useContext(AuthContext);
  if (!auth) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return auth;
}
