import { Box } from 'leather-styles/jsx';
import { NetworkBadge } from 'src/pages/settings/network/network-items';

import routes from '@constants/routes';
import { useNavigate } from '@hooks/use-navigate';
import { useStacksNetwork } from '@hooks/use-stacks-network';

export function NetworkInfo() {
  const navigate = useNavigate();
  const { networkName, networkLabel } = useStacksNetwork();

  return (
    <Box cursor="pointer" onClick={() => navigate(routes.SETTINGS_NETWORK)}>
      <NetworkBadge networkName={networkName} networkLabel={networkLabel} />
    </Box>
  );
}
