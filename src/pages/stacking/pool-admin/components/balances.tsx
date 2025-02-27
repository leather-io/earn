import { useFormikContext } from 'formik';
import { styled } from 'leather-styles/jsx';
import { PooledStackerFormValues } from 'src/types/stacking';

import { toHumanReadableStx } from '@utils/unit-convert';

export function Balances() {
  const { values } = useFormikContext<PooledStackerFormValues>();

  const { delegated, lockedAmount, totalAmount, delegatedAmount } = values;

  if (delegated === undefined || !lockedAmount || !totalAmount || !delegatedAmount) {
    return null;
  }

  return (
    <>
      <styled.p color="ink.text-subdued" mt="base-tight">
        Available balance: {toHumanReadableStx(totalAmount)}
      </styled.p>
      <styled.p color="ink.text-subdued" mt="base-tight">
        Locked amount: {toHumanReadableStx(lockedAmount)}
      </styled.p>
      <styled.p color="ink.text-subdued" mt="base-tight">
        Delegated amount: {toHumanReadableStx(delegatedAmount)}
      </styled.p>
    </>
  );
}
