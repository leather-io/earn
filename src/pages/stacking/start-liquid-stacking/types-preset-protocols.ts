import { NetworkInstance } from 'src/pages/stacking/start-pooled-stacking/types-preset-pools';

export const enum ProtocolName {
  StackingDao = 'StackingDAO',
  Lisa = 'Lisa',
}

export const enum LiquidContractName {
  WrapperStackingDAO,
  Lisa,
}

export const NetworkInstanceToLiquidContractMap = {
  [NetworkInstance.devnet]: {
    [LiquidContractName.WrapperStackingDAO]: '',
    [LiquidContractName.Lisa]: '',
  },
  [NetworkInstance.testnet]: {
    [LiquidContractName.WrapperStackingDAO]:
      'ST2PABAF9FTAJYNFZH93XENAJ8FVY99RRM4DF2YCW.stacking-dao-core-v1',
    [LiquidContractName.Lisa]: '',
  },
  [NetworkInstance.mainnet]: {
    [LiquidContractName.WrapperStackingDAO]:
      'SP4SZE494VC2YC5JYG7AYFQ44F5Q4PYV7DVMDPBG.stacking-dao-core-v1',
    [LiquidContractName.Lisa]:
      'SM3KNVZS30WM7F89SXKVVFY4SN9RMPZZ9FX929N0V.auto-whitelist-mint-helper',
  },
} as const;

export const enum LiquidToken {
  ST_STX = 'stSTX',
  LI_STX = 'LiSTX',
  OTHER = 'OTHER',
}

type ContractMapType = typeof NetworkInstanceToLiquidContractMap;
export type LiquidContractType = ContractMapType[NetworkInstance];

export type LiquidContractPrincipal =
  LiquidContractType[keyof LiquidContractType][LiquidContractName];

export type Protocol = {
  name: ProtocolName;
  protocolAddress: { [key in NetworkInstance]: LiquidContractPrincipal } | undefined;
  description: string;
  website: string;
  duration: number;
  icon: JSX.Element;
  liquidContract: LiquidContractName;
  liquidToken: LiquidToken;
  minimumDelegationAmount: number;
};
