import { Button } from '@leather.io/ui';
import { intToBigInt } from '@stacks/common';
import { Input, Spinner } from '@stacks/ui';
import { useField } from 'formik';
import { Box, styled } from 'leather-styles/jsx';
import { token } from 'leather-styles/tokens';

import { ErrorAlert } from '@components/error-alert';
import { ErrorLabel } from '@components/error-label';
import { ErrorText } from '@components/error-text';
import { useGetAccountExtendedBalancesQuery } from '@components/stacking-client-provider/stacking-client-provider';
import { microStxToStx, toHumanReadableStx } from '@utils/unit-convert';

import { Description, Step } from '../../components/stacking-form-step';

export function ChooseStackingAmount() {
  const [field, meta, helpers] = useField('amount');
  const queryGetAccountExtendedBalances = useGetAccountExtendedBalancesQuery();
  const totalAvailableBalance = queryGetAccountExtendedBalances.data?.stx.balance
    ? intToBigInt(queryGetAccountExtendedBalances.data.stx.balance)
    : undefined;
  const lockedBalance = queryGetAccountExtendedBalances.data?.stx.locked
    ? intToBigInt(queryGetAccountExtendedBalances.data.stx.locked)
    : undefined;
  const availableForStacking =
    totalAvailableBalance && lockedBalance ? totalAvailableBalance - lockedBalance : undefined;

  return (
    <Step title="Amount">
      <Description>
        <styled.p textStyle="body.01">
          Choose how much you&apos;ll stack. Your liquid stacking protocol may require a minimum.
          <br />
          <br />
          The STX tokens will leave your wallet and you will get stSTX or LiSTX which represents
          your principal plus yield.
        </styled.p>
      </Description>

      <Box position="relative" maxWidth="400px">
        <Input
          id="stxAmount"
          mt="loose"
          placeholder="Amount of STX to Stack"
          {...field}
          backgroundColor={token('colors.ink.background-primary')}
        />
        {meta.touched && meta.error && (
          <ErrorLabel>
            <ErrorText>{meta.error}</ErrorText>
          </ErrorLabel>
        )}
      </Box>

      <Box textStyle="body.03" mt="space.03" aria-busy={queryGetAccountExtendedBalances.isLoading}>
        {queryGetAccountExtendedBalances.isLoading ? (
          <Spinner />
        ) : availableForStacking ? (
          <>
            <styled.p mt="space.03" color="ink.text-primary">
              Available balance:{' '}
            </styled.p>
            <Button
              variant="outline"
              size="sm"
              type="button"
              color="#12100F"
              onClick={() => helpers.setValue(microStxToStx(availableForStacking))}
            >
              {toHumanReadableStx(availableForStacking)}
            </Button>
          </>
        ) : (
          <ErrorAlert>Failed to load available balance</ErrorAlert>
        )}
      </Box>
    </Step>
  );
}
