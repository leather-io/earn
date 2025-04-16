import { ReactNode, createContext, useContext } from 'react';

import { StackingClient } from '@stacks/stacking';
import {
  fetchCallReadOnlyFunction,
  validateStacksAddress as isValidStacksAddress,
  noneCV,
  principalCV,
} from '@stacks/transactions';
import { useQuery } from '@tanstack/react-query';
import { PoxContractName } from 'src/pages/stacking/start-pooled-stacking/types-preset-pools';
import { getPoxContracts } from 'src/pages/stacking/start-pooled-stacking/utils-preset-pools';

import { useAuth } from '@components/auth-provider/auth-provider';
import { useStacksNetwork } from '@hooks/use-stacks-network';

interface StackingClientContext {
  client: null | StackingClient;
}
const StackingClientContext = createContext<StackingClientContext>({
  client: null,
});

interface Props {
  children: ReactNode;
}
export function StackingClientProvider({ children }: Props) {
  const { address } = useAuth();
  const { network } = useStacksNetwork();

  let client: StackingClient | null = null;

  if (address !== null && isValidStacksAddress(address)) {
    client = new StackingClient({ address, network });
  }

  return (
    <>
      <StackingClientContext.Provider value={{ client }}>{children}</StackingClientContext.Provider>
    </>
  );
}

export function useStackingClient() {
  return useContext(StackingClientContext);
}

export function useGetCycleDurationQuery() {
  const { client } = useStackingClient();
  if (!client) throw new Error('Expected client to be defined.');
  return useQuery(['getCycleDuration', client], () => client.getCycleDuration());
}

export function useGetStatusWithClientQuery(client: StackingClient) {
  if (!client) throw new Error('Expected client to be defined.');
  return useQuery(['getStatus', client], () => client.getStatus());
}

export function useGetStatusQuery() {
  const { client } = useStackingClient();
  if (!client) throw new Error('Expected client to be defined.');
  return useQuery(['getStatus', client], () => client.getStatus());
}

export function useGetPoxOperationInfo() {
  const { client } = useStackingClient();
  if (!client) throw new Error('Expected client to be defined.');
  return useQuery(['getPoxOperationInfo', client], () => client.getPoxOperationInfo());
}

export function useGetAccountBalanceQuery() {
  const { client } = useStackingClient();
  if (!client) throw new Error('Expected client to be defined.');
  return useQuery(['getAccountBalance', client], () => client.getAccountBalance());
}

export function useGetAccountBalanceLockedQuery() {
  const { client } = useStackingClient();
  if (!client) throw new Error('Expected client to be defined.');
  return useQuery(['getAccountBalanceLocked', client], () => client.getAccountBalanceLocked());
}

export function useGetCoreInfoQuery() {
  const { client } = useStackingClient();
  if (!client) throw new Error('Expected client to be defined.');
  return useQuery(['getCoreInfo', client], () => client.getCoreInfo());
}

export function useGetAccountExtendedBalancesQuery() {
  const { client } = useStackingClient();
  return useGetAccountExtendedBalancesWithClientQuery(client);
}

export function useGetAccountExtendedBalancesWithClientQuery(client: StackingClient | null) {
  if (!client) throw new Error('Expected client to be defined.');
  return useQuery(['getAccountExtendedBalances', client], () =>
    client.getAccountExtendedBalances()
  );
}

export function useGetSecondsUntilNextCycleQuery() {
  const { client } = useStackingClient();
  if (!client) throw new Error('Expected client to be defined.');
  return useQuery(['getSecondsUntilNextCycle', client], () => client.getSecondsUntilNextCycle(), {
    refetchInterval: 60_000,
  });
}

export function useGetPoxInfoQuery() {
  const { client } = useStackingClient();
  if (!client) throw new Error('Expected client to be defined.');
  return useQuery(['getPoxInfo', client], () => client.getPoxInfo());
}

export function useGetConfirmedDelegationStatus(client: StackingClient) {
  if (!client) throw new Error('Expected client to be defined.');
  return useQuery(['getConfirmedDelegationStatus', client], () => client.getDelegationStatus());
}

// Eventually, this can be a function on the Stacking Client
export function useGetAllowanceContractCallersQuery(callingContract: string) {
  const { address: senderAddress } = useAuth();
  const { network } = useStacksNetwork();

  const poxContractId = getPoxContracts(network)[PoxContractName.Pox4];

  return useQuery(['getAllowanceContractCallers', senderAddress, callingContract, network], () => {
    if (senderAddress) {
      const [contractAddress, contractName] = poxContractId.split('.');
      return fetchCallReadOnlyFunction({
        contractAddress,
        contractName,
        functionName: 'get-allowance-contract-callers',
        functionArgs: [principalCV(senderAddress), principalCV(callingContract)],
        senderAddress,
        network,
      });
    } else {
      return Promise.resolve(noneCV());
    }
  });
}
