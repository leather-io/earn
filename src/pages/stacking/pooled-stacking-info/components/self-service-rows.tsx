import { Button } from '@stacks/ui';

import {
  InfoCardLabel as Label,
  InfoCardRow as Row,
  InfoCardValue as Value,
} from '@components/info-card';
import {
  useGetCoreInfoQuery,
  useGetPoxInfoQuery,
} from '@components/stacking-client-provider/stacking-client-provider';

import { nextExtendWindow } from '../../self-service-extend/utils';

interface SelfServiceRowsProps {
  isLoading?: boolean;
  onClick: React.MouseEventHandler;
  children: React.ReactNode;
  showCancleButton?: boolean;
  onClose?: React.MouseEventHandler;
}
export function SelfServiceRows({
  isLoading,
  onClick,
  showCancleButton,
  onClose,
  children,
}: SelfServiceRowsProps) {
  const getPoxInfoQuery = useGetPoxInfoQuery();
  const getCoreInfoQuery = useGetCoreInfoQuery();
  const burnBlockHeight = getCoreInfoQuery.data?.burn_block_height;

  if (!getPoxInfoQuery.data || !burnBlockHeight) {
    return <></>;
  }
  const { extendWindow, tooEarly, tooLate } = nextExtendWindow(
    burnBlockHeight,
    getPoxInfoQuery.data
  );
  return (
    <>
      {tooEarly || tooLate ? (
        <Row>
          <Label>Extend to cycle {getPoxInfoQuery.data.current_cycle.id + 1} in</Label>
          <Value>{extendWindow.blocksUntilStart} blocks</Value>
        </Row>
      ) : (
        <Row>
          <Label>Time left to extend</Label>
          <Value>{extendWindow.blocksUntilEnd} blocks</Value>
        </Row>
      )}
      <Row justifyContent={showCancleButton ? 'space-between' : 'space-evenly'}>
        {showCancleButton && (
          <Button mode="tertiary" onClick={onClose}>
            Cancel
          </Button>
        )}
        <Button
          type="submit"
          isDisabled={tooEarly || tooLate}
          isLoading={isLoading}
          onClick={onClick}
        >
          {children}
        </Button>
      </Row>
    </>
  );
}
