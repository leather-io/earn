import { useEffect } from 'react';
import { Outlet, RouterProvider, createBrowserRouter, useSearchParams } from 'react-router-dom';

import '@leather.io/ui/styles';
import { StacksNetworkName } from '@stacks/network';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { BlockchainApiClientProvider } from '@components/blockchain-api-client-provider';
import { Navigate } from '@components/navigate';
import { StackingClientProvider } from '@components/stacking-client-provider/stacking-client-provider';
import { NetworkModeUrlMap } from '@constants/network';
import { analytics, initAnalytics } from '@utils/analytics';
import { loadFonts } from '@utils/load-fonts';

import { AuthGuard } from './components/auth-guard';
import { AuthProvider } from './components/auth-provider/auth-provider';
import { Layout } from './components/layout';
import { IS_BROWSER } from './constants';
import { AppContextProvider } from './context/global-context';
import './index.css';
import { ChooseStackingMethod } from './pages/choose-stacking-method/choose-stacking-method';
import { AddNetwork } from './pages/settings/add-network';
import { Network } from './pages/settings/network/network';
import { SignIn } from './pages/sign-in/sign-in';
import { DirectStackingInfo } from './pages/stacking/direct-stacking-info/direct-stacking-info';
import { DelegateStackExtend } from './pages/stacking/pool-admin/delegate-stack-extend/delegate-stack-extend';
import { DelegateStackIncrease } from './pages/stacking/pool-admin/delegate-stack-increase/delegate-stack-increase';
import { DelegateStackStx } from './pages/stacking/pool-admin/delegate-stack-stx/delegate-stack-stx';
import { PoolInfo } from './pages/stacking/pool-admin/pool-info/pool-info';
import { StackAggregationCommit } from './pages/stacking/pool-admin/stack-aggregation-commit/stack-aggregation-commit';
import { StackAggregationIncrease } from './pages/stacking/pool-admin/stack-aggregation-increase/stack-aggregation-increase';
import { PooledStackingInfo } from './pages/stacking/pooled-stacking-info/pooled-stacking-info';
import { SelfServiceExtend } from './pages/stacking/self-service-extend/self-service-extend';
import { GenerateSignerKeySignature } from './pages/stacking/signer/generate-signature/signer-key-signature';
import { SignerInfo } from './pages/stacking/signer/signer-info/signer-info';
import { StackExtend } from './pages/stacking/stack-extend/stack-extend';
import { StackIncrease } from './pages/stacking/stack-increase/stack-increase';
import { StartDirectStacking } from './pages/stacking/start-direct-stacking/start-direct-stacking';
import { StartLiquidStacking } from './pages/stacking/start-liquid-stacking/start-liquid-stacking';
import { StartPooledStacking } from './pages/stacking/start-pooled-stacking/start-pooled-stacking';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchInterval: 1000 * 60,
      refetchOnWindowFocus: false,
    },
  },
});

function Root() {
  useEffect(() => void loadFonts(), []);
  useEffect(() => {
    void initAnalytics();
  }, []);

  const [searchParams] = useSearchParams();
  const chain = searchParams.get('chain');
  const api = searchParams.get('api');
  const queryNetworkMode = (chain || 'mainnet') as StacksNetworkName;
  const queryApiUrl = api;
  return (
    <QueryClientProvider client={queryClient}>
      <AppContextProvider
        cookies={IS_BROWSER ? document?.cookie : ''}
        apiUrls={NetworkModeUrlMap}
        queryNetworkMode={queryNetworkMode}
        queryApiUrl={queryApiUrl}
      >
        <AuthProvider>
          <StackingClientProvider>
            <BlockchainApiClientProvider>
              <Outlet />
            </BlockchainApiClientProvider>
          </StackingClientProvider>
        </AuthProvider>
      </AppContextProvider>
    </QueryClientProvider>
  );
}

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    children: [
      { index: true, element: <Navigate to="sign-in" /> },
      {
        path: 'sign-in',
        element: <Layout />,
        children: [
          {
            index: true,
            element: <SignIn />,
          },
        ],
      },
      {
        element: <AuthGuard />,
        children: [
          {
            element: <Layout />,
            children: [
              {
                path: 'choose-stacking-method',
                element: <ChooseStackingMethod />,
              },
              {
                path: 'start-pooled-stacking',
                element: <StartPooledStacking />,
              },
              {
                path: 'pooled-stacking-info',
                element: <PooledStackingInfo />,
              },
              {
                path: 'start-direct-stacking',
                element: <StartDirectStacking />,
              },
              {
                path: 'direct-stacking-info',
                element: <DirectStackingInfo />,
              },
              {
                path: 'start-liquid-stacking',
                element: <StartLiquidStacking />,
              },
              {
                path: 'lock-more-stx',
                element: <StackIncrease />,
              },
              {
                path: 'extend-stacking',
                element: <StackExtend />,
              },
              {
                path: 'self-service-extend',
                element: <SelfServiceExtend />,
              },
              {
                path: 'signer',
                children: [
                  { index: true, element: <SignerInfo /> },
                  { path: 'generate-signature', element: <GenerateSignerKeySignature /> },
                ],
              },
              { path: 'pool/:poolAddress', element: <PoolInfo /> },
              {
                path: 'pool-admin',
                children: [
                  { index: true, element: <PoolInfo /> },
                  { path: 'delegate-stack-stx', element: <DelegateStackStx /> },
                  { path: 'delegate-stack-extend', element: <DelegateStackExtend /> },
                  { path: 'delegate-stack-increase', element: <DelegateStackIncrease /> },
                  { path: 'stack-aggregation-commit', element: <StackAggregationCommit /> },
                  { path: 'stack-aggregation-increase', element: <StackAggregationIncrease /> },
                ],
              },
              {
                path: 'settings',
                children: [
                  { path: 'add-network', element: <AddNetwork /> },
                  { path: 'network', element: <Network /> },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
]);

export function App() {
  useEffect(() => {
    router.subscribe(state => {
      analytics.client.page(state.location.pathname);
    });
  }, []);

  return <RouterProvider router={router} />;
}
