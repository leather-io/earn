import { NetworkInstance } from 'src/pages/stacking/start-pooled-stacking/types-preset-pools';

export const enum ProtocolName {
  StackingDao = 'StackingDAO',
}

export const enum PoxContractName {
  Pox3,
  WrapperStackingDAO,
}

export const NetworkInstanceToPoxContractMap = {
  [NetworkInstance.devnet]: {
    [PoxContractName.Pox3]: 'ST000000000000000000002AMW42H.pox-3',
    [PoxContractName.WrapperStackingDAO]: '',
  },
  [NetworkInstance.testnet]: {
    [PoxContractName.Pox3]: 'ST000000000000000000002AMW42H.pox-3',
    [PoxContractName.WrapperStackingDAO]:
      'ST2PABAF9FTAJYNFZH93XENAJ8FVY99RRM4DF2YCW.stacking-dao-core-v1',
  },
  [NetworkInstance.mainnet]: {
    [PoxContractName.Pox3]: 'SP000000000000000000002Q6VF78.pox-3',
    [PoxContractName.WrapperStackingDAO]:
      'SP4SZE494VC2YC5JYG7AYFQ44F5Q4PYV7DVMDPBG.stacking-dao-core-v1',
  },
} as const;

export const enum PayoutMethod {
  BTC = 'BTC',
  STX = 'STX',
  OTHER = 'OTHER',
}
type ContractMapType = typeof NetworkInstanceToPoxContractMap;
export type PoxContractType = ContractMapType[NetworkInstance];

export type WrapperPrincipal = PoxContractType[keyof PoxContractType][PoxContractName];

export type Protocol = {
  name: ProtocolName;
  protocolAddress: { [key in NetworkInstance]: string } | undefined;
  description: string;
  website: string;
  duration: number;
  icon: JSX.Element;
  payoutMethod: PayoutMethod;
  poxContract: PoxContractName;
  minimumDelegationAmount: number;
  allowCustomRewardAddress: boolean;
};
