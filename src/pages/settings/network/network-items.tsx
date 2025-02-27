'use client';

import React from 'react';
import { TbTrash } from 'react-icons/tb';
import { useNavigate as useNavigateRouterDom } from 'react-router-dom';

import { Button, ButtonProps, CheckmarkIcon, IconButton } from '@leather.io/ui';
import { Configuration, InfoApi } from '@stacks/blockchain-api-client';
import { CoreNodeInfoResponse } from '@stacks/blockchain-api-client/src/generated/models';
import { StacksNetworkName } from '@stacks/network';
import { ChainId } from '@stacks/network';
import { Spinner } from '@stacks/ui';
import { useQuery } from '@tanstack/react-query';
import { css } from 'leather-styles/css';
import { BoxProps, Flex, FlexProps, Stack, styled } from 'leather-styles/jsx';

import routes from '@constants/routes';
import { useNavigate } from '@hooks/use-navigate';
import { createSearch } from '@utils/networks';
import { ONE_MINUTE } from '@utils/query-stale-time';

import { Badge } from '../../../components/badge';
import { Tooltip } from '../../../components/tooltip';
import { useGlobalContext } from '../../../context/use-app-context';
import { Network, whenStacksChainId } from '../../../types/network';

interface ItemWrapperProps extends FlexProps {
  isDisabled?: string | boolean;
  isActive?: boolean;
}

const ItemWrapper: React.FC<ItemWrapperProps> = ({ isActive, isDisabled, ...props }) => {
  return (
    <Flex
      opacity={isDisabled ? 0.5 : 1}
      alignItems="center"
      px="space.05"
      justifyContent="space-between"
      position="relative"
      zIndex="999"
      bg={'ink.background-primary'}
      cursor={isDisabled ? 'not-allowed' : 'unset'}
      _hover={{
        bg: isDisabled || isActive ? undefined : 'ink.component-background-hover',
        cursor: isDisabled ? 'not-allowed' : isActive ? 'default' : 'pointer',
      }}
      {...props}
    />
  );
};

interface ItemProps extends ItemWrapperProps {
  item: Network;
  isCustom?: boolean;
}

const getCustomNetworkApiInfo = (baseUrl: string) => () => {
  const coreInfoApi = new InfoApi(new Configuration({ basePath: baseUrl }));
  return coreInfoApi.getCoreApiInfo();
};

export const NetworkBadge = ({
  networkName,
  networkLabel,
}: {
  networkName: string;
  networkLabel: string;
}) => {
  return (
    <Badge bg="ink.background-pr" color="ink.background-primary">
      {`${networkLabel}:${networkName}`}
    </Badge>
  );
};

const Item = ({ item, isActive, isDisabled, onClick, isCustom, ...rest }: ItemProps) => {
  const {
    removeCustomNetwork,
    apiUrls: { mainnet, testnet },
  } = useGlobalContext();
  const isMainnet = item.url === mainnet;
  const isTestnet = item.url === testnet;
  const isDefault = isMainnet || isTestnet;

  let itemNetworkId: ChainId.Mainnet | ChainId.Testnet = isMainnet
    ? ChainId.Mainnet
    : ChainId.Testnet;

  const doNotFetch = isDisabled || !item.url || isDefault;

  const { data, error, isInitialLoading } = useQuery<CoreNodeInfoResponse, Error>(
    ['customNetworkApiInfo', item.url],
    getCustomNetworkApiInfo(item.url),
    {
      staleTime: ONE_MINUTE,
      enabled: !doNotFetch,
      suspense: false,
      useErrorBoundary: false,
    }
  );

  if (!isDefault && data) {
    itemNetworkId = data?.network_id && data.network_id;
  }

  const itemNetworkMode: StacksNetworkName = whenStacksChainId(itemNetworkId)({
    [ChainId.Mainnet]: 'mainnet',
    [ChainId.Testnet]: 'testnet',
  });

  return (
    <ItemWrapper
      isActive={isActive}
      isDisabled={!!isDisabled || !!error || isInitialLoading}
      className={css({
        cursor: isDisabled ? 'not-allowed' : 'pointer',
      })}
      {...rest}
    >
      <Stack pr={'32px'} py="16px" width="100%" flexGrow={1} onClick={onClick}>
        <Flex alignItems="center">
          {
            <styled.p textStyle="heading.01" fontSize="16px" lineHeight="1" fontWeight="400">
              {item.label}
              {itemNetworkMode ? `:${itemNetworkMode}` : null}
            </styled.p>
          }
          {/* {itemNetworkMode ? (
            <NetworkBadge networkName={itemNetworkMode} networkLabel={item.label} />
          ) : null} */}
        </Flex>
        <styled.p textStyle="label.01" fontSize="14px" lineHeight="20px" fontWeight="400">
          {item?.url?.includes('//') ? item?.url?.split('//')[1] : item?.url || isDisabled}
        </styled.p>
      </Stack>
      <Flex alignItems="center" py="16px" position={'relative'}>
        {isCustom && !isActive ? (
          <Tooltip text="Remove network">
            <IconButton
              position="relative"
              zIndex={999}
              size="sm"
              icon={<TbTrash size={'21px'} />}
              onClick={() => removeCustomNetwork(item)}
              aria-label={'Remove network'}
            />
          </Tooltip>
        ) : isInitialLoading ? (
          <Spinner size="18px" opacity={0.5} color={'#666'} />
        ) : error ? (
          <styled.p color="red.action-primary-default">Offline</styled.p>
        ) : isActive ? (
          <CheckmarkIcon
            className={css({
              color: 'ink.action-primary-default',
              width: '18px',
              height: '18px',
            })}
          />
        ) : null}
      </Flex>
    </ItemWrapper>
  );
};

const AddNetwork: React.FC<
  ButtonProps & {
    isDisabled?: string | boolean;
    isActive?: boolean;
  }
> = ({ onClick, ...rest }) => {
  const navigate = useNavigate();

  return (
    <Button
      {...rest}
      mt="space.04"
      mx="space.05"
      onClick={e => {
        navigate(routes.ADD_NETWORK);
        onClick?.(e);
      }}
      variant="outline"
    >
      Add a network
    </Button>
  );
};

interface NetworkItemsProps extends BoxProps {
  onItemClick?: (item: Network | 'new') => void;
}

function NetworkItemsComponent({ onItemClick }: NetworkItemsProps) {
  const navigate = useNavigateRouterDom();
  const { networks, activeNetwork } = useGlobalContext();
  return (
    <>
      {Object.values<Network>(networks).map((network, key) => {
        const isActive = activeNetwork.url === network.url;
        return (
          <Item
            isActive={isActive}
            item={network}
            key={key}
            isCustom={key >= 3}
            onClick={() => {
              setTimeout(() => {
                onItemClick?.(network);
                if (!isActive) {
                  const to = {
                    pathname: '/',
                    search: createSearch(network),
                  };
                  navigate(to);
                }
              }, 250);
            }}
          />
        );
      })}

      <AddNetwork
        onClick={() => {
          onItemClick?.('new');
        }}
      />
    </>
  );
}

export const NetworkItems = React.memo(NetworkItemsComponent);
