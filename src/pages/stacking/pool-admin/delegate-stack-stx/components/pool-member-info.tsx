import { AccountExtendedBalances, DelegationInfo } from '@stacks/stacking';
import { Text } from '@stacks/ui';

import { toHumanReadableStx } from '@utils/unit-convert';

interface PoolMemberInfoProps {
  delegationStatus: DelegationInfo | undefined;
  extendedBalances: AccountExtendedBalances | undefined;
}

export function PoolMemberInfo({ delegationStatus, extendedBalances }: PoolMemberInfoProps) {
  return (
    <>
      {delegationStatus && delegationStatus.delegated && (
        <Text>
          Delegated amount: {toHumanReadableStx(delegationStatus.details.amount_micro_stx)}
        </Text>
      )}
      {extendedBalances && (
        <Text>Unlocked balance: {toHumanReadableStx(extendedBalances.stx.balance.toString())}</Text>
      )}
    </>
  );
}
