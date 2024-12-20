import { useMemo } from 'react';

import { openContractCall } from '@stacks/connect';
import { StacksNetworkName } from '@stacks/network';
import {
  Cl,
  PostConditionMode,
  UnsignedContractCallOptions,
  fetchCallReadOnlyFunction,
} from '@stacks/transactions';
import { useQuery } from '@tanstack/react-query';

import { useAuth } from '@components/auth-provider/auth-provider';

import { useStacksNetwork } from './use-stacks-network';

type EnrollContractIdenfier = Pick<UnsignedContractCallOptions, 'contractName' | 'contractAddress'>;

const sbtcEnrollContractMap: Record<StacksNetworkName, EnrollContractIdenfier> = {
  testnet: {
    contractAddress: 'ST1SY0NMZMBSA28MH31T09KCQWPZ4H5HRMYRX4XW7',
    contractName: 'yield-rewards-testnet',
  },
  devnet: {
    contractAddress: 'STB44HYPYAT2BB2QE513NSP81HTMYWBJP02HPGK6',
    contractName: 'yield',
  },
  mainnet: {
    contractAddress: 'SP804CDG3KBN9M6E00AD744K8DC697G7HBCG520Q',
    contractName: 'sbtc-yield-rewards',
  },
  mocknet: {} as EnrollContractIdenfier,
};

function getEnrollContractCallByNetwork(network: StacksNetworkName) {
  return sbtcEnrollContractMap[network];
}

async function fetchIsAddressEnrolled(
  address: string,
  contract: EnrollContractIdenfier,
  network: StacksNetworkName
) {
  const resp = await fetchCallReadOnlyFunction({
    ...contract,
    functionName: 'is-enrolled-in-next-cycle',
    functionArgs: [Cl.principal(address)],
    senderAddress: contract.contractAddress,
    network,
  });
  console.log('resp', resp);
  // TODO: To test when enrolled
  return { isEnrolled: resp.type === 'true', ...resp };
}

export function useEnrolledStatus() {
  const { address } = useAuth();
  const network = useStacksNetwork();
  const query = useQuery({
    queryFn: () =>
      fetchIsAddressEnrolled(
        address ?? '',
        getEnrollContractCallByNetwork(network.networkName),
        network.networkName
      ),
    queryKey: ['is-enrolled', address, network.networkName],
  });
  return query;
}

export function useSbtcEnroll({
  onFinish,
  onCancel,
}: {
  onFinish?: () => void;
  onCancel?: () => void;
}) {
  const network = useStacksNetwork();
  const { address } = useAuth();

  return useMemo(
    () => ({
      async createSbtcYieldEnrollContractCall() {
        if (network.networkName === 'mocknet') throw new Error('Mocknet not supported');

        if (!address) throw new Error('No address');

        const contractDetails = getEnrollContractCallByNetwork(network.networkName);

        try {
          openContractCall({
            ...contractDetails,
            functionName: 'enroll',
            functionArgs: [Cl.some(Cl.principal(address))],
            network: network.networkName,
            fee: 14000,
            postConditionMode: PostConditionMode.Deny,
            onFinish: response => {
              console.log('on finish', response);
              onFinish?.();
            },
            onCancel: () => {
              console.log('on cancel');
              onCancel?.();
            },
          });
        } catch (e) {
          console.log(e);
        }
      },
    }),
    [address, network, onFinish, onCancel]
  );
}
