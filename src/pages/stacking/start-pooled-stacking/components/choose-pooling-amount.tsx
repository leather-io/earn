import { Button, Input, Spinner } from '@leather.io/ui';
import { intToBigInt } from '@stacks/common';
import { useField } from 'formik';
import { Box, Flex, styled } from 'leather-styles/jsx';

import { ErrorAlert } from '@components/error-alert';
import { ErrorLabel } from '@components/error-label';
import { ErrorText } from '@components/error-text';
import { useGetAccountExtendedBalancesQuery } from '@components/stacking-client-provider/stacking-client-provider';
import { microStxToStx, toHumanReadableStx } from '@utils/unit-convert';

import { Description, Step } from '../../components/stacking-form-step';

export function ChoosePoolingAmount() {
  const [field, meta, helpers] = useField('amount');
  const queryGetAccountExtendedBalances = useGetAccountExtendedBalancesQuery();
  const totalAvailableBalance = queryGetAccountExtendedBalances.data?.stx.balance
    ? intToBigInt(queryGetAccountExtendedBalances.data.stx.balance)
    : undefined;
  const lockedBalance = queryGetAccountExtendedBalances.data?.stx.locked
    ? intToBigInt(queryGetAccountExtendedBalances.data.stx.locked)
    : undefined;

  return (
    <Step title="Amount">
      <Description>
        <styled.p color="ink.text-subdued">
          Choose how much you&apos;ll pool. Your pool may require a minimum.
        </styled.p>
        <styled.p color="ink.text-subdued">
          The pooled amount can be higher than your current balance to allow the pool to stack more
          in the future.
        </styled.p>
        <styled.p color="ink.text-subdued">
          The pool may stack less than the delegated amount to leave some change to pay for
          transaction fees.
        </styled.p>
      </Description>

      <Box position="relative" maxWidth="400px" mt="space.05">
        <Input.Root>
          <Input.Label>Amount of STX to Stack</Input.Label>
          <Input.Field id="stxAmount" {...field} />
        </Input.Root>
        {meta.touched && meta.error && (
          <ErrorLabel>
            <ErrorText>{meta.error}</ErrorText>
          </ErrorLabel>
        )}
      </Box>

      <Box
        textStyle="body.02"
        color="ink.text-subdued"
        mt="space.03"
        aria-busy={queryGetAccountExtendedBalances.isLoading}
      >
        Available balance:{' '}
        {queryGetAccountExtendedBalances.isLoading ? (
          <Spinner />
        ) : totalAvailableBalance ? (
          <Button
            variant="ghost"
            size="sm"
            type="button"
            color="#12100F"
            onClick={() => helpers.setValue(microStxToStx(totalAvailableBalance))}
          >
            {toHumanReadableStx(totalAvailableBalance)}{' '}
          </Button>
        ) : (
          <ErrorAlert>Failed to load</ErrorAlert>
        )}
      </Box>

      {lockedBalance ? (
        <>
          <Box
            textStyle="body.02"
            color="ink.text-subdued"
            mt="space.03"
            aria-busy={queryGetAccountExtendedBalances.isLoading}
          >
            Minimum amount:{' '}
            <Button
              variant="ghost"
              size="sm"
              type="button"
              color="#12100F"
              onClick={() => helpers.setValue(microStxToStx(lockedBalance))}
            >
              {toHumanReadableStx(lockedBalance)}{' '}
            </Button>
          </Box>
          <Box
            background="ink.background-secondary"
            my="space.02"
            py="space.02"
            px="20px"
            borderRadius="10px"
          >
            <Flex>
              <Box textStyle="body.02" color="ink.text-subdued">
                The minimum amount is what is already stacked. For continuous stacking, you will
                have to pool this amount or more.
              </Box>
            </Flex>
          </Box>
        </>
      ) : null}
    </Step>
  );
}
