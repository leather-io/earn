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
      'Liquid stacking, a new feature developed by Stacking DAO, gives users an "auto-compounding tokenized representation of stacked STX (stSTX)" ' +
      "in exchange for their STX. Unlike Stacking, there's no minimum STX requirement for participation, and according to Stacking DAO, " +
      'users can trade back to STX at any time. ' +
      'Learn more about Stacking DAO by visiting their website and reading Stacking DAO’s docs. ' +
      "PLEASE NOTE: Leather Wallet allows users to integrate with Stacking DAO's liquid stacking feature," +
      'but does not manage or have any control over the liquid stacking process.',
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
