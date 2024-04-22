export const enum NetworkInstance {
  mainnet = 'mainnet',
  testnet = 'testnet',
  devnet = 'devnet',
}

export const enum PoolName {
  FastPool = 'FAST Pool',
  Xverse = 'Xverse',
  PlanBetter = 'PlanBetter',
  CustomPool = 'Custom Pool',
}

export const enum PoxContractName {
  Pox3,
  WrapperOneCycle,
  WrapperFastPool,
  Pox4,
}

export const NetworkInstanceToPoxContractMap = {
  [NetworkInstance.devnet]: {
    [PoxContractName.Pox3]: 'ST000000000000000000002AMW42H.pox-3',
    [PoxContractName.Pox4]: 'ST000000000000000000002AMW42H.pox-4',
    [PoxContractName.WrapperOneCycle]: 'ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM.pox4-pools',
    [PoxContractName.WrapperFastPool]:
      'ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM.pox4-self-service',
  },
  [NetworkInstance.testnet]: {
    [PoxContractName.Pox3]: 'ST000000000000000000002AMW42H.pox-3',
    [PoxContractName.Pox4]: 'ST000000000000000000002AMW42H.pox-4',
    [PoxContractName.WrapperOneCycle]: 'ST2PABAF9FTAJYNFZH93XENAJ8FVY99RRM4DF2YCW.pox4-pools',
    [PoxContractName.WrapperFastPool]:
      'ST2PABAF9FTAJYNFZH93XENAJ8FVY99RRM4DF2YCW.pox4-self-service',
  },
  [NetworkInstance.mainnet]: {
    [PoxContractName.Pox3]: 'SP000000000000000000002Q6VF78.pox-3',
    [PoxContractName.Pox4]: 'SP000000000000000000002Q6VF78.pox-4',
    [PoxContractName.WrapperOneCycle]: 'SP001SFSMC2ZY76PD4M68P3WGX154XCH7NE3TYMX.pox4-pools',
    [PoxContractName.WrapperFastPool]:
      'SP21YTSM60CAY6D011EZVEVNKXVW8FVZE198XEFFP.pox4-fast-pool-v3',
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
