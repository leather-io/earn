export const enum NetworkInstance {
  mainnet = 'mainnet',
  testnet = 'testnet',
  devnet = 'devnet',
}

export const enum PoolName {
  FastPool = 'FAST Pool',
  FastPoolV2 = 'FAST Pool v2',
  Xverse = 'Xverse',
  PlanBetter = 'PlanBetter',
  Restake = 'Restake',
  StackingDao = 'Stacking DAO',
  CustomPool = 'Custom Pool',
}

export const enum PoxContractName {
  WrapperOneCycle,
  WrapperFastPool,
  WrapperFastPoolV2,
  WrapperRestake,
  WrapperStackingDao,
  Pox4,
}

export const NetworkInstanceToPoxContractMap = {
  [NetworkInstance.devnet]: {
    [PoxContractName.Pox4]: 'ST000000000000000000002AMW42H.pox-4',
    [PoxContractName.WrapperOneCycle]: 'ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM.pox4-pools',
    [PoxContractName.WrapperFastPool]:
      'ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM.pox4-self-service',
    [PoxContractName.WrapperFastPoolV2]:
      'ST2PABAF9FTAJYNFZH93XENAJ8FVY99RRM4DF2YCW.pox4-self-service',
    [PoxContractName.WrapperRestake]: 'ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM.pox4-self-service',
    [PoxContractName.WrapperStackingDao]:
      'SP4SZE494VC2YC5JYG7AYFQ44F5Q4PYV7DVMDPBG.native-stacking-pool-v1',
  },
  [NetworkInstance.testnet]: {
    [PoxContractName.Pox4]: 'ST000000000000000000002AMW42H.pox-4',
    [PoxContractName.WrapperOneCycle]: 'ST2PABAF9FTAJYNFZH93XENAJ8FVY99RRM4DF2YCW.pox4-pools',
    [PoxContractName.WrapperFastPool]:
      'ST2PABAF9FTAJYNFZH93XENAJ8FVY99RRM4DF2YCW.pox4-self-service',
    [PoxContractName.WrapperFastPoolV2]:
      'ST2PABAF9FTAJYNFZH93XENAJ8FVY99RRM4DF2YCW.pox4-self-service',
    [PoxContractName.WrapperRestake]: 'ST2PABAF9FTAJYNFZH93XENAJ8FVY99RRM4DF2YCW.pox4-self-service',
    [PoxContractName.WrapperStackingDao]:
      'SP4SZE494VC2YC5JYG7AYFQ44F5Q4PYV7DVMDPBG.native-stacking-pool-v1',
  },
  [NetworkInstance.mainnet]: {
    [PoxContractName.Pox4]: 'SP000000000000000000002Q6VF78.pox-4',
    [PoxContractName.WrapperOneCycle]: 'SP001SFSMC2ZY76PD4M68P3WGX154XCH7NE3TYMX.pox4-pools',
    [PoxContractName.WrapperFastPool]:
      'SP21YTSM60CAY6D011EZVEVNKXVW8FVZE198XEFFP.pox4-fast-pool-v3',
    [PoxContractName.WrapperFastPoolV2]:
      'SPMPMA1V6P430M8C91QS1G9XJ95S59JS1TZFZ4Q4.pox4-multi-pool-v1',
    [PoxContractName.WrapperRestake]:
      'SPZV5RJN5XTJHA76E0VHEFB0WPEH7E11NZZ4CGBK.restake-self-service-pool-v1',
    [PoxContractName.WrapperStackingDao]:
      'SP4SZE494VC2YC5JYG7AYFQ44F5Q4PYV7DVMDPBG.native-stacking-pool-v1',
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

export type Pool = {
  name: PoolName;
  poolAddress: { [key in NetworkInstance]: string } | undefined;
  description: string;
  website: string;
  duration: number;
  icon: JSX.Element;
  payoutMethod: PayoutMethod;
  poxContract: PoxContractName;
  minimumDelegationAmount: number;
  allowCustomRewardAddress: boolean;
};
