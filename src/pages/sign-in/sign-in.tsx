import { Box } from 'leather-styles/jsx';

import { useAuth } from '@components/auth-provider/auth-provider';
import { Navigate } from '@components/navigate';

import { ChooseStackingMethodAuthHandler } from '../choose-stacking-method/choose-stacking-method';

export function SignIn() {
  const { isSignedIn } = useAuth();
  if (isSignedIn) {
    return <Navigate to={'../choose-stacking-method'} replace />;
  }

  return (
    <Box>
      <ChooseStackingMethodAuthHandler />
    </Box>
  );
}
