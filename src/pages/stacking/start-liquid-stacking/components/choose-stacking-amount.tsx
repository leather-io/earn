import { intToBigInt } from '@stacks/common';
import { Box, Button, Flex, Input, Spinner, Text, color } from '@stacks/ui';
import { useField } from 'formik';

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
    ? intToBigInt(queryGetAccountExtendedBalances.data.stx.balance, false)
    : undefined;
  const lockedBalance = queryGetAccountExtendedBalances.data?.stx.locked
    ? intToBigInt(queryGetAccountExtendedBalances.data.stx.locked, false)
    : undefined;

  return (
    <Step title="Amount">
      <Description>
        <Text>
          Choose how much you&apos;ll stack. Your liquid stacking protocol may require a minimum.
        </Text>
        <Text>
          The STX tokens will leave your wallet and you will get stSTX which represents your
          principal plus yield.
        </Text>
      </Description>

      <Box position="relative" maxWidth="400px">
        <Input id="stxAmount" mt="loose" placeholder="Amount of STX to Stack" {...field} />
        {meta.touched && meta.error && (
          <ErrorLabel>
            <ErrorText>{meta.error}</ErrorText>
          </ErrorLabel>
        )}
      </Box>

      <Box
        textStyle="body.small"
        color={color('text-caption')}
        mt="base-tight"
        aria-busy={queryGetAccountExtendedBalances.isLoading}
      >
        Available balance:{' '}
        {queryGetAccountExtendedBalances.isLoading ? (
          <Spinner />
        ) : totalAvailableBalance ? (
          <Button
            variant="link"
            type="button"
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
            background={color('bg-alt')}
            my="tight"
            py="tight"
            px="base-loose"
            borderRadius="10px"
          >
            <Flex>
              <Box textStyle="body.small" color={color('text-caption')}>
                The minimum amount is what is already stacked.
              </Box>
            </Flex>
          </Box>
        </>
      ) : null}
    </Step>
  );
}
