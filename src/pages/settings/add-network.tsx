import { Box, Flex } from 'leather-styles/jsx';
import { styled } from 'leather-styles/jsx';

import { AddNetworkForm } from '@components/add-network-form';
import { BaseDrawer } from '@components/drawer/base-drawer';
import { InfoCard } from '@components/info-card';
import routes from '@constants/routes';
import { useNavigate } from '@hooks/use-navigate';

export const AddNetwork = () => {
  const navigate = useNavigate();
  return (
    <BaseDrawer title={'Add a network'} isShowing onClose={() => navigate(routes.HOME)}>
      <Flex alignItems="center" flexDirection="column" pb={['loose', '48px']} px="loose">
        <InfoCard width="420px">
          <Box m={['space.04', 'space.06']}>
            <Flex flexDirection="column" pt="extra-loose" pb="base-loose">
              <styled.p textStyle="body.01" mb="space.04" color="ink.text-primary">
                Use this form to add a new instance of the{' '}
                <styled.a
                  display="inline"
                  href="https://github.com/hirosystems/stacks-blockchain-api"
                  target="_blank"
                  color="ink.text-primary"
                >
                  Stacks Blockchain API
                </styled.a>
                . Make sure you review and trust the host before you add it.
              </styled.p>
            </Flex>
            <AddNetworkForm />
          </Box>
        </InfoCard>
      </Flex>
    </BaseDrawer>
  );
};
