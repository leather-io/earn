import { ExtendedAccountBalances } from '@stacks/stacking';

import {
  InfoCardLabel as Label,
  InfoCardRow as Row,
  InfoCardValue as Value,
} from '@components/info-card';
import { useGetCoreInfoQuery } from '@components/stacking-client-provider/stacking-client-provider';

interface PercentageRowProps {
  extendedStxBalances: ExtendedAccountBalances['stx'];
}
export function PercentageRow({ extendedStxBalances }: PercentageRowProps) {
  const getCoreInfoQuery = useGetCoreInfoQuery();
  const burnBlockHeight = getCoreInfoQuery.data?.burn_block_height;

  let lockingProgressPercentString = '0';
  if (burnBlockHeight && extendedStxBalances) {
    const cycleLengthInBlocks =
      extendedStxBalances.burnchain_unlock_height - extendedStxBalances.burnchain_lock_height;

    if (cycleLengthInBlocks > 0) {
      const blocksUntilUnlocked = extendedStxBalances.burnchain_unlock_height - burnBlockHeight;

      lockingProgressPercentString = Math.max(
        ((cycleLengthInBlocks - blocksUntilUnlocked) / cycleLengthInBlocks) * 100,
        0
      ).toFixed(2);
    }
  }

  return (
    <Row>
      <Label explainer="This percentage measures the number of blocks between when you locked STX to when your STX are unlocked">
        Progress
      </Label>
      <Value>{lockingProgressPercentString}%</Value>
    </Row>
  );
}
