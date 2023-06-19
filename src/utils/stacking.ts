import { ChainID } from '@stacks/common';
import { StacksNetwork } from '@stacks/network';
import { poxAddressToBtcAddress } from '@stacks/stacking';

interface ConvertToPoxAddressBtc {
  version: Uint8Array;
  hashbytes: Uint8Array;
}
export function convertPoxAddressToBtc(network: 'mainnet' | 'testnet') {
  return ({ version, hashbytes }: ConvertToPoxAddressBtc) => {
    return poxAddressToBtcAddress(version[0], hashbytes, network);
  };
}

export const formatPoxAddressToNetwork = (
  network: StacksNetwork,
  poxAddress: ConvertToPoxAddressBtc
) => {
  return convertPoxAddressToBtc(network.chainId === ChainID.Mainnet ? 'mainnet' : 'testnet')(
    poxAddress
  );
};

export function formatCycles(cycles: number) {
  return `${cycles} cycle${cycles !== 1 ? 's' : ''}`;
}
