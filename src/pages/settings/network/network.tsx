import { Flex } from 'leather-styles/jsx';

import { BaseDrawer } from '@components/drawer/base-drawer';
import { InfoCard } from '@components/info-card';
import routes from '@constants/routes';
import { useNavigate } from '@hooks/use-navigate';

import { NetworkItems } from './network-items';

export const Network = () => {
  const navigate = useNavigate();
  return (
    <BaseDrawer
      title={'Select network'}
      isShowing
      onClose={() => {
        navigate(routes.HOME);
      }}
    >
      <Flex alignItems="center" flexDirection="column" px="0">
        <InfoCard border="none" borderColor="ink.border-default" width="100%" px="space.00">
          <NetworkItems />
        </InfoCard>
      </Flex>
    </BaseDrawer>
  );
};
