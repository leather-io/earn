import { useMemo } from 'react';

import { Spinner } from '@stacks/ui';
import { addSeconds, formatDistanceToNow } from 'date-fns';
import { useField } from 'formik';
import { Flex, HStack, styled } from 'leather-styles/jsx';

import { CircleButton } from '@components/circle-button';
import { ErrorAlert } from '@components/error-alert';
import { useGetCycleDurationQuery } from '@components/stacking-client-provider/stacking-client-provider';
import { MAX_STACKING_CYCLES, MIN_STACKING_CYCLES } from '@constants/app';
import { decrement, increment } from '@utils/mutate-numbers';
import { formatCycles } from '@utils/stacking';

const createCycleArray = () => new Array(12).fill(null).map((_, i) => i + 1);
const durationWithDefault = (duration: number | null) => duration ?? 1;

export function DurationCyclesField() {
  const q = useGetCycleDurationQuery();
  const [cyclesField, , durationLengthHelpers] = useField('numberOfCycles');
  const duration = cyclesField.value ?? 1;

  const cycleLabels = useMemo(() => {
    if (typeof q.data !== 'number') return [];
    return createCycleArray().map(
      c =>
        `${formatCycles(c)} ends in about ${formatDistanceToNow(
          addSeconds(new Date(), c * q.data)
        )}`
    );
  }, [q.data]);

  if (q.isLoading) return <Spinner />;
  if (typeof q.data !== 'number') {
    const msg = 'Expected `data` to be a number.';
    console.error(msg);
    <ErrorAlert>{msg}</ErrorAlert>;
  }
  if (typeof duration !== 'number') {
    const msg = 'Expected `duration` to be a number.';
    console.error(msg);
    <ErrorAlert>{msg}</ErrorAlert>;
  }

  return (
    <>
      <Flex
        alignItems="center"
        justifyContent="space-between"
        mt="base"
        padding="8px"
        boxShadow="low"
        border="1px solid"
        borderColor="ink.border-default"
        borderRadius="8px"
        onClick={e => (e.stopPropagation(), e.preventDefault())}
        position="relative"
        zIndex={10}
      >
        <styled.span alignItems="center" ml="tight" color="ink.text-primary">
          {cycleLabels[durationWithDefault(duration) - 1]}
        </styled.span>
        <HStack gap="1">
          <CircleButton
            onClick={e => {
              e.stopPropagation();
              durationLengthHelpers.setValue(
                Math.max(MIN_STACKING_CYCLES, decrement(durationWithDefault(duration)))
              );
            }}
          >
            -
          </CircleButton>
          <CircleButton
            ml={[null, 'extra-tight']}
            onClick={e => {
              e.stopPropagation();
              durationLengthHelpers.setValue(
                Math.min(MAX_STACKING_CYCLES, increment(durationWithDefault(duration)))
              );
            }}
          >
            +
          </CircleButton>
        </HStack>
      </Flex>
    </>
  );
}
