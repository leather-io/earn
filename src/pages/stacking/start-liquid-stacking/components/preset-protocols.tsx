import { NetworkInstance } from 'src/pages/stacking/start-pooled-stacking/types-preset-pools';

import {
  NetworkInstanceToLiquidContractMap,
  LiquidToken,
  LiquidContractName,
  ProtocolName,
  Protocol,
} from '../types-preset-protocols';
import { PoolIcon } from './pool-icon';

export const protocols: { [key in ProtocolName]: Protocol } = {
  StackingDAO: {
    name: ProtocolName.StackingDao,
    description:
      'Enjoy automatic protocol operations and auto-compounded yield.' +
      ' ' +
      'Locked STX will stay stacked indefinitely.',
    duration: 1,
    website: 'https://www.stackingdao.com',
    liquidContract: LiquidContractName.WrapperStackingDAO,
    liquidToken: LiquidToken.ST_STX,
    protocolAddress: {
      [NetworkInstance.mainnet]:
        NetworkInstanceToLiquidContractMap[NetworkInstance.mainnet][
          LiquidContractName.WrapperStackingDAO
        ],
      [NetworkInstance.testnet]:
        NetworkInstanceToLiquidContractMap[NetworkInstance.testnet][
          LiquidContractName.WrapperStackingDAO
        ],
      [NetworkInstance.devnet]:
        NetworkInstanceToLiquidContractMap[NetworkInstance.devnet][
          LiquidContractName.WrapperStackingDAO
        ],
    },
    minimumDelegationAmount: 1_000_000,
    icon: <PoolIcon src="/32x32_StackingDao.png" />,
  },
  Lisa: {
    name: ProtocolName.Lisa,
    description: '', // TODO
    duration: 1,
    website: 'https://www.lisalab.io/',
    liquidContract: LiquidContractName.Lisa,
    liquidToken: LiquidToken.LI_STX,
    protocolAddress: {
      [NetworkInstance.mainnet]:
        NetworkInstanceToLiquidContractMap[NetworkInstance.mainnet][LiquidContractName.Lisa],
      [NetworkInstance.testnet]:
        NetworkInstanceToLiquidContractMap[NetworkInstance.testnet][LiquidContractName.Lisa],
      [NetworkInstance.devnet]:
        NetworkInstanceToLiquidContractMap[NetworkInstance.devnet][LiquidContractName.Lisa],
    },
    minimumDelegationAmount: 1_000_000,
    icon: <PoolIcon src="/32x32_Lisa.png" />,
  },
};
