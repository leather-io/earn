import { ChainID } from '@stacks/common';
import { StacksNetwork } from '@stacks/network';
import { DEFAULT_DEVNET_SERVER } from 'src/constants';
import { NetworkInstance } from 'src/pages/stacking/start-pooled-stacking/types-preset-pools';

import { protocols } from './components/preset-protocols';
import {
  NetworkInstanceToPoxContractMap,
  PoxContractName,
  PoxContractType,
  Protocol,
  ProtocolName,
  WrapperPrincipal,
} from './types-preset-protocols';

export function getNetworkInstance(network: StacksNetwork) {
  if (network.chainId === ChainID.Mainnet) {
    return NetworkInstance.mainnet;
  } else if (network.coreApiUrl === DEFAULT_DEVNET_SERVER) {
    return NetworkInstance.devnet;
  } else {
    return NetworkInstance.testnet;
  }
}

export function getPox3Contracts(network: StacksNetwork): PoxContractType {
  const mode = getNetworkInstance(network);
  return NetworkInstanceToPoxContractMap[mode];
}

export function usesPoxWrapperContract(protocol: Protocol) {
  return protocol.poxContract !== PoxContractName.Pox3;
}

export function getPoxWrapperContract(
  protocolName: ProtocolName,
  network: StacksNetwork
): WrapperPrincipal {
  return getPox3Contracts(network)[protocols[protocolName].poxContract];
}

export function getPoxWrapperContract2(
  networkInstance: NetworkInstance,
  poxContractName: PoxContractName
): WrapperPrincipal {
  return NetworkInstanceToPoxContractMap[networkInstance][poxContractName];
}

export function getPoxContractAddressAndName(
  networkInstance: NetworkInstance,
  poxContract: PoxContractName
) {
  return NetworkInstanceToPoxContractMap[networkInstance][poxContract].split('.');
}
