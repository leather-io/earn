import { NetworkInstance } from 'src/pages/stacking/start-pooled-stacking/types-preset-pools';

import {
  NetworkInstanceToPoxContractMap,
  PayoutMethod,
  PoxContractName,
  ProtocolName,
} from '../types-preset-protocols';
import { PoolIcon } from './pool-icon';

export const protocols = {
  StackingDAO: {
    name: ProtocolName.StackingDao,
    description:
      'Enjoy automatic protocol operations and auto-compounded yield.' +
      ' ' +
      'Locked STX will stay stacked indefinitely.',
    duration: 1,
    website: 'https://stackingdao.com',
    payoutMethod: PayoutMethod.STX,
    protocolAddress: {
      [NetworkInstance.mainnet]:
        NetworkInstanceToPoxContractMap[NetworkInstance.mainnet][
          PoxContractName.WrapperStackingDAO
        ],
      [NetworkInstance.testnet]:
        NetworkInstanceToPoxContractMap[NetworkInstance.testnet][
          PoxContractName.WrapperStackingDAO
        ],
      [NetworkInstance.devnet]:
        NetworkInstanceToPoxContractMap[NetworkInstance.devnet][PoxContractName.WrapperStackingDAO],
    },
    poxContract: PoxContractName.WrapperStackingDAO,
    minimumDelegationAmount: 1_000_000,
    icon: <PoolIcon src="/32x32_StackingDao.jpg" />,
    allowCustomRewardAddress: false,
  },
};
