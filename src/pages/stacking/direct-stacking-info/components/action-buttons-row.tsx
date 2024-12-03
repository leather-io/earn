import { Button } from '@leather.io/ui';
import { Flex } from 'leather-styles/jsx';

import { useNavigate } from '@hooks/use-navigate';

export function ActionButtonsRow() {
  const navigate = useNavigate();
  async function handleLockMoreClick() {
    navigate('../lock-more-stx');
  }

  async function handleExtendStackingClick() {
    navigate('../extend-stacking');
  }
  return (
    <Flex mt="space.04" gap="space.04" flex={1}>
      <Button fullWidth variant="outline" onClick={handleLockMoreClick}>
        Lock more STX
      </Button>
      <Button fullWidth variant="outline" onClick={handleExtendStackingClick}>
        Extend stacking
      </Button>
    </Flex>
  );
}
