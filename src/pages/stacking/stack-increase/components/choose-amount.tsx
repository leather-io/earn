import { Button, Input } from '@leather.io/ui';
import BigNumber from 'bignumber.js';
import { useField } from 'formik';
import { Box, Stack, styled } from 'leather-styles/jsx';

import { ErrorLabel } from '@components/error-label';
import { ErrorText } from '@components/error-text';
import { useGetAccountExtendedBalancesQuery } from '@components/stacking-client-provider/stacking-client-provider';
import { microStxToStx } from '@utils/unit-convert';

import { Description } from '../../components/stacking-form-step';
import { useGetHasPendingStackingTransactionQuery } from '../../direct-stacking-info/use-get-has-pending-tx-query';
import { getAvailableAmountUstx } from '../utils';

export function Amount() {
  const getAccountExtendedBalancesQuery = useGetAccountExtendedBalancesQuery();
  const { getHasPendingStackIncreaseQuery } = useGetHasPendingStackingTransactionQuery();

  const [field, meta, helpers] = useField('increaseBy');
  const maxAmountUstx = getAccountExtendedBalancesQuery.data?.stx
    ? getAvailableAmountUstx(
        getAccountExtendedBalancesQuery.data.stx,
        getHasPendingStackIncreaseQuery.data
      )
    : undefined;
  const setMax = () => {
    if (maxAmountUstx) {
      helpers.setValue(microStxToStx(maxAmountUstx).toFixed(0, BigNumber.ROUND_DOWN));
    }
  };

  return (
    <Stack>
      <Description>
        <Stack alignItems="flex-start" gap="space.04">
          <styled.p>
            Choose how much you want to add to the current value you are already stacking.
          </styled.p>
        </Stack>
      </Description>

      <Box position="relative" my="space.05">
        <Input.Root>
          <Input.Label>Amount of additional STX to stack</Input.Label>
          <Input.Field id="stxAmount" autoComplete="off" {...field} />
        </Input.Root>
        {meta.touched && meta.error && (
          <ErrorLabel>
            <ErrorText>{meta.error}</ErrorText>
          </ErrorLabel>
        )}
        <Button
          type="button"
          size="sm"
          height="28px"
          right="12px"
          top="18px"
          style={{ position: 'absolute' }}
          width="80px"
          onClick={setMax}
          disabled={!maxAmountUstx}
          fontSize="12px"
          zIndex={10}
        >
          Stack max
        </Button>
      </Box>
    </Stack>
  );
}
