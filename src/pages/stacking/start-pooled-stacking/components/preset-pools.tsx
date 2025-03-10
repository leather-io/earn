import { IconEdit } from '@tabler/icons-react';

import { MIN_DELEGATED_STACKING_AMOUNT_USTX } from '@constants/app';

import {
  NetworkInstance,
  NetworkInstanceToPoxContractMap,
  PayoutMethod,
  PoolName,
  PoxContractName,
} from '../types-preset-pools';
import { PoolIcon } from './pool-icon';

export const pools = {
  'FAST Pool': {
    name: PoolName.FastPool,
    description:
      'Enjoy automatic pool operations.' +
      ' ' +
      'You can increase the locking amount for the next cycle.' +
      ' ' +
      'Locked STX will unlock 1 day after the end of the cycle.',
    duration: 1,
    website: 'https://fastpool.org',
    payoutMethod: PayoutMethod.STX,
    poolAddress: {
      [NetworkInstance.mainnet]:
        NetworkInstanceToPoxContractMap[NetworkInstance.mainnet][PoxContractName.WrapperFastPool],
      [NetworkInstance.testnet]:
        NetworkInstanceToPoxContractMap[NetworkInstance.testnet][PoxContractName.WrapperFastPool],
      [NetworkInstance.devnet]:
        NetworkInstanceToPoxContractMap[NetworkInstance.devnet][PoxContractName.WrapperFastPool],
    }, // pool address is the same as pool contract
    poxContract: PoxContractName.WrapperFastPool,
    minimumDelegationAmount: 40_000_000,
    icon: <PoolIcon src="/32x32_FastPool.png" />,
    allowCustomRewardAddress: false,
    disabled: false,
  },
  'FAST Pool v2': {
    name: PoolName.FastPoolV2,
    description:
      'Enjoy better swim experience in the upgraded pool.' +
      ' ' +
      'You can increase the locking amount for the next cycle.' +
      ' ' +
      'Locked STX will unlock 1 day after the end of the cycle.',
    duration: 1,
    website: 'https://fastpool.org',
    payoutMethod: PayoutMethod.STX,
    poolAddress: {
      [NetworkInstance.mainnet]:
        NetworkInstanceToPoxContractMap[NetworkInstance.mainnet][PoxContractName.WrapperFastPoolV2],
      [NetworkInstance.testnet]:
        NetworkInstanceToPoxContractMap[NetworkInstance.testnet][PoxContractName.WrapperFastPoolV2],
      [NetworkInstance.devnet]:
        NetworkInstanceToPoxContractMap[NetworkInstance.devnet][PoxContractName.WrapperFastPoolV2],
    }, // pool address is the same as pool contract
    poxContract: PoxContractName.WrapperFastPoolV2,
    minimumDelegationAmount: 40_000_000,
    icon: <PoolIcon src="/32x32_FastPool.png" />,
    allowCustomRewardAddress: false,
    disabled: false,
  },

  PlanBetter: {
    name: PoolName.PlanBetter,
    description: 'Earn non-custodial Bitcoin yield. No wrapped tokens. Native BTC.',
    duration: 1,
    website: 'https://planbetter.org',
    payoutMethod: PayoutMethod.BTC,
    poolAddress: {
      [NetworkInstance.mainnet]: 'SP3TDKYYRTYFE32N19484838WEJ25GX40Z24GECPZ',
      [NetworkInstance.testnet]: 'SP3TDKYYRTYFE32N19484838WEJ25GX40Z24GECPZ',
      [NetworkInstance.devnet]: 'SP3TDKYYRTYFE32N19484838WEJ25GX40Z24GECPZ',
    },
    poxContract: PoxContractName.WrapperOneCycle,
    minimumDelegationAmount: 200_000_000,
    icon: <PoolIcon src="/32x32_PlanBetter.png" />,
    allowCustomRewardAddress: false, // only for ledger users
    disabled: false,
  },

  Restake: {
    name: PoolName.Restake,
    description:
      'Earn STX rewards by pooling your tokens with Restake, a non-custodial infrastructure operator trusted by institutions.',
    duration: 1,
    website: 'https://restake.net/stacks-pool',
    payoutMethod: PayoutMethod.STX,
    poolAddress: {
      [NetworkInstance.mainnet]:
        NetworkInstanceToPoxContractMap[NetworkInstance.mainnet][PoxContractName.WrapperRestake],
      [NetworkInstance.testnet]:
        NetworkInstanceToPoxContractMap[NetworkInstance.testnet][PoxContractName.WrapperRestake],
      [NetworkInstance.devnet]:
        NetworkInstanceToPoxContractMap[NetworkInstance.devnet][PoxContractName.WrapperRestake],
    }, // pool address is the same as pool contract
    poxContract: PoxContractName.WrapperRestake,
    minimumDelegationAmount: 100_000_000,
    icon: <PoolIcon src="/32x32_Restake.png" />,
    allowCustomRewardAddress: false,
    disabled: false,
  },

  'Stacking DAO': {
    name: PoolName.StackingDao,
    description:
      'Earn BTC rewards by pooling your tokens with Stacking DAO, the leading LST provider on Stacks.',
    duration: 1,
    website: 'https://app.stackingdao.com/?stackingOption=stx',
    payoutMethod: PayoutMethod.BTC,
    poolAddress: {
      [NetworkInstance.mainnet]:
        NetworkInstanceToPoxContractMap[NetworkInstance.mainnet][
          PoxContractName.WrapperStackingDao
        ],
      [NetworkInstance.testnet]:
        NetworkInstanceToPoxContractMap[NetworkInstance.testnet][
          PoxContractName.WrapperStackingDao
        ],
      [NetworkInstance.devnet]:
        NetworkInstanceToPoxContractMap[NetworkInstance.devnet][PoxContractName.WrapperStackingDao],
    }, // pool address is the same as pool contract
    poxContract: PoxContractName.WrapperStackingDao,
    minimumDelegationAmount: 500_000_000,
    icon: <PoolIcon src="/32x32_StackingDao.png" />,
    allowCustomRewardAddress: false,
    disabled: false,
  },

  Xverse: {
    name: PoolName.Xverse,
    description:
      'Xverse pool is a non-custodial stacking pool service from the makers of Xverse wallet.',
    duration: 1,
    website: 'https://pool.xverse.app/',
    payoutMethod: PayoutMethod.BTC,
    poolAddress: {
      [NetworkInstance.mainnet]: 'SPXVRSEH2BKSXAEJ00F1BY562P45D5ERPSKR4Q33',
      [NetworkInstance.testnet]: 'SPXVRSEH2BKSXAEJ00F1BY562P45D5ERPSKR4Q33',
      [NetworkInstance.devnet]: 'SPXVRSEH2BKSXAEJ00F1BY562P45D5ERPSKR4Q33',
    },
    poxContract: PoxContractName.WrapperOneCycle,
    minimumDelegationAmount: 100_000_000,
    icon: <PoolIcon src="/32x32_Xverse.png" />,
    allowCustomRewardAddress: true,
    disabled: false,
  },

  'Custom Pool': {
    name: PoolName.CustomPool,
    description:
      'Enter the STX address of the pool with which you’d like to Stack without your STX leaving your wallet.',
    duration: -1,
    website: 'https://www.stacks.co/learn/stacking',
    payoutMethod: PayoutMethod.OTHER,
    poolAddress: undefined,
    poxContract: PoxContractName.Pox4,
    minimumDelegationAmount: MIN_DELEGATED_STACKING_AMOUNT_USTX,
    icon: <IconEdit />,
    allowCustomRewardAddress: false,
    disabled: false,
  },
};
