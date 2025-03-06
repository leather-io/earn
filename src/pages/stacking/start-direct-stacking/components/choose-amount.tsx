import { Button, Input, Spinner } from '@leather.io/ui';
import { BigNumber } from 'bignumber.js';
import { useField } from 'formik';
import { Box, Stack, styled } from 'leather-styles/jsx';

import { ErrorAlert } from '@components/error-alert';
import { ErrorLabel } from '@components/error-label';
import { ErrorText } from '@components/error-text';
import { OpenExternalLinkInNewTab } from '@components/external-link';
import {
  useGetAccountExtendedBalancesQuery,
  useGetPoxInfoQuery,
} from '@components/stacking-client-provider/stacking-client-provider';
import { pseudoBorderLeft } from '@components/styles/pseudo-border-left';
import {
  STACKING_CONTRACT_CALL_TX_BYTES,
  STACKING_LEARN_MORE_URL,
  STACKING_MINIMIUM_FOR_NEXT_CYCLE_URL,
} from '@constants/app';
import { microStxToStx, stxToMicroStx, toHumanReadableStx } from '@utils/unit-convert';

import { Description, Step } from '../../components/stacking-form-step';
import { calculateRewardSlots, calculateStackingBuffer } from '../../utils/calc-stacking-buffer';

const BigNumberFloorRound = BigNumber.clone({
  ROUNDING_MODE: BigNumber.ROUND_FLOOR,
});

export function Amount() {
  const getAccountExtendedBalancesQuery = useGetAccountExtendedBalancesQuery();
  const getPoxInfoQuery = useGetPoxInfoQuery();

  const [field, meta, helpers] = useField('amount');

  if (getAccountExtendedBalancesQuery.isLoading || getPoxInfoQuery.isLoading) return <Spinner />;

  if (
    getAccountExtendedBalancesQuery.isError ||
    typeof getAccountExtendedBalancesQuery.data.stx.balance !== 'bigint' ||
    getPoxInfoQuery.isError ||
    !getPoxInfoQuery.data
  ) {
    const id = '134098d7-444b-4591-abfe-8767af6def3f';
    const msg = 'Failed to load necessary data.';
    console.error(id, msg);
    return <ErrorAlert id={id}>{msg}</ErrorAlert>;
  }

  const availableBalance = getAccountExtendedBalancesQuery.data.stx.balance;
  const minimumAmountUstx = getPoxInfoQuery.data.min_amount_ustx;

  const ustxAmount = stxToMicroStx(field.value || 0);

  const showStackingWarningCard = true; //ustxAmount.isGreaterThanOrEqualTo(minimumAmountUstx);

  let maxAmountUstx = new BigNumberFloorRound(
    new BigNumber(availableBalance.toString()).minus(STACKING_CONTRACT_CALL_TX_BYTES).toString()
  ).decimalPlaces(0);
  if (maxAmountUstx.isNegative()) {
    maxAmountUstx = new BigNumber(0);
  }

  const setMax = () => {
    helpers.setValue(microStxToStx(maxAmountUstx.toString()).toFixed(0, BigNumber.ROUND_DOWN));
  };

  const numberOfRewardSlots = calculateRewardSlots(
    ustxAmount,
    new BigNumber(minimumAmountUstx)
  ).integerValue();

  const buffer = calculateStackingBuffer(ustxAmount, new BigNumber(minimumAmountUstx));

  return (
    <Step title="Choose amount">
      <Description>
        <Stack alignItems="flex-start" gap="space.04">
          <styled.p color="ink.text-subdued">
            You&apos;ll be eligible for one reward slot for every multiple of the minimum you stack.
          </styled.p>
          <styled.p color="ink.text-subdued">
            The estimated minimum per slot can change by multiples of 10,000 every cycle, so you may
            want to add a buffer to increase your chance of keeping the same number of slots.
          </styled.p>
          <styled.p color="ink.text-subdued">
            <OpenExternalLinkInNewTab href={STACKING_LEARN_MORE_URL}>
              Learn more about risks of stacking at or near the minimum
            </OpenExternalLinkInNewTab>
          </styled.p>
          <styled.p color="ink.text-subdued">
            <OpenExternalLinkInNewTab href={STACKING_MINIMIUM_FOR_NEXT_CYCLE_URL}>
              View the minimum for next cycle
            </OpenExternalLinkInNewTab>
          </styled.p>
        </Stack>
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
        <Button
          type="button"
          size="sm"
          height="28px"
          right="12px"
          top="18px"
          style={{ position: 'absolute' }}
          width="80px"
          onClick={setMax}
          zIndex={10}
        >
          Stack max
        </Button>
      </Box>

      {showStackingWarningCard && (
        <>
          <Stack textStyle="body.small" gap="space.04" mt="space.04">
            <styled.p color="ink.text-subdued">
              This entered amount would get you {numberOfRewardSlots.toString()} reward slot
              {numberOfRewardSlots.toNumber() === 1 ? '' : 's'} with a{' '}
              {toHumanReadableStx(buffer || 0)} buffer at the current minimum. However, that minimum
              is subject to change and there is no guarantee you will get any reward slots.
            </styled.p>
          </Stack>

          {buffer !== null && buffer.isEqualTo(0) && (
            <Box
              textStyle="body.02"
              color="ink.text-primary"
              border="1px solid"
              p="space.05"
              mt="space.04"
              borderRadius="6px"
              borderColor="ink.border-default"
              className={pseudoBorderLeft('red.action-primary-default')}
            >
              Add a buffer for a higher chance (though no guarantee) of keeping the same number of
              reward slots should the minimum increase. If you can’t add a buffer, consider Stacking
              in a pool instead.
              <Button
                type="button"
                display="block"
                mt="space.02"
                onClick={() => helpers.setValue(new BigNumber(field.value).plus(10000).toString())}
              >
                Add 10,000 STX buffer
              </Button>
            </Box>
          )}
        </>
      )}
    </Step>
  );
}
