import { useAuth } from '@components/auth-provider/auth-provider';
import { useNavigate } from '@hooks/use-navigate';

import { ChooseStackingMethodLayoutProps } from '../types';
import { hasExistingCommitment } from '../utils';
import { analytics } from '@utils/analytics';

export const usePooledStackingButton = (props: ChooseStackingMethodLayoutProps) => {
  const navigate = useNavigate();
  const { signIn, isSigningIn } = useAuth();

  const isDisabled = props.isSignedIn
    ? hasExistingCommitment(props) || !props.hasEnoughBalanceToPool
    : isSigningIn;

  const onClick = () => {
    if (!props.isSignedIn) {
      signIn({ allowAllProviders: true });
      return;
    }

    navigate('../start-pooled-stacking');
  };
  return { isDisabled, onClick };
};

export const useDirectStackingButton = (props: ChooseStackingMethodLayoutProps) => {
  const navigate = useNavigate();
  const { signIn, isSigningIn } = useAuth();

  const isDisabled = props.isSignedIn
    ? hasExistingCommitment(props) || !props.hasEnoughBalanceToDirectStack
    : isSigningIn;

  const onClick = () => {
    if (!props.isSignedIn) {
      signIn({ allowAllProviders: true });
      return;
    }

    navigate('../start-direct-stacking');
  };

  return { isDisabled, onClick };
};

export const useLiquidStackingButton = (props: ChooseStackingMethodLayoutProps) => {
  const navigate = useNavigate();
  const { signIn, isSigningIn } = useAuth();

  const isDisabled = props.isSignedIn ? !props.hasEnoughBalanceToPool : isSigningIn;

  const onClick = () => {
    if (!props.isSignedIn) {
      signIn({ allowAllProviders: true });
      return;
    }

    navigate('../start-liquid-stacking');
  };

  return { isDisabled, onClick };
};

export function useLeatherSbtcBridgeButton(setUpdateModalOpen: (open: boolean) => void) {
  const leatherDetected = window.LeatherProvider !== undefined;
  const { isSignedIn, signIn } = useAuth();
  const leatherNotDetectedOrNotSignedIn = !leatherDetected || !isSignedIn;

  return {
    onClick: async () => {
      if (leatherNotDetectedOrNotSignedIn) {
        signIn({ allowAllProviders: true });
        return;
      }
      try {
        await window.LeatherProvider?.request('openSwap', {
          base: 'BTC',
          quote: 'sBTC',
        });
        analytics.untypedTrack('sbtc_bridge_requested');
      } catch (error) {
        analytics.untypedTrack('sbtc_bridge_request_failed');
        console.error('Error requesting openSwap', error);
        setUpdateModalOpen(true);
      }
    },
  };
}
