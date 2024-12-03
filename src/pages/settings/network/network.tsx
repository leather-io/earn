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
      <Flex alignItems="center" flexDirection="column" pb={['space.04', '48px']} px="space.04">
        <InfoCard border="none" borderColor="ink.border-default" width="420px">
          <NetworkItems />
        </InfoCard>
      </Flex>
    </BaseDrawer>
  );
};
