import { ChainID } from '@stacks/common';
import { StacksNetwork } from '@stacks/network';
import { DEFAULT_DEVNET_SERVER } from 'src/constants';
import { NetworkInstance } from 'src/pages/stacking/start-pooled-stacking/types-preset-pools';

import {
  LiquidContractName,
  NetworkInstanceToLiquidContractMap,
  LiquidContractType,
  LiquidContractPrincipal,
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

export function getPox3Contracts(network: StacksNetwork): LiquidContractType {
  const mode = getNetworkInstance(network);
  return NetworkInstanceToLiquidContractMap[mode];
}

export function getLiquidContract(
  networkInstance: NetworkInstance,
  poxContractName: LiquidContractName
): LiquidContractPrincipal {
  return NetworkInstanceToLiquidContractMap[networkInstance][poxContractName];
}

export function getLiquidContractAddressAndName(
  networkInstance: NetworkInstance,
  poxContractName: LiquidContractName
) {
  return NetworkInstanceToLiquidContractMap[networkInstance][poxContractName].split('.');
}
