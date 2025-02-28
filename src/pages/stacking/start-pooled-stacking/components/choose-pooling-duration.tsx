import { useState } from 'react';

import { Button } from '@leather.io/ui';
import { useField } from 'formik';
import { Box, Flex, Stack, styled } from 'leather-styles/jsx';

import { ErrorLabel } from '@components/error-label';
import { ErrorText } from '@components/error-text';

import { Description, Step } from '../../components/stacking-form-step';
import { PoolName } from '../types-preset-pools';
import { DurationCyclesField } from './duration-cycles-field';
import { DurationSelectItem } from './duration-select-item';
import { IndefiniteStackingIcon } from './indefinite-stacking-icon';
import { LimitedStackingIcon } from './limited-stacking-icon';
import { pools } from './preset-pools';

function RecommendedFor({ children }: { children?: React.ReactNode }) {
  return (
    <Box background="#FAF8F6" mt="space.04" py="loose" px="base-loose" borderRadius="10px">
      <Flex>
        <Box p="space.04">
          <styled.p fontStyle="caption" color="ink.text-primary">
            Recommended for
          </styled.p>
          <styled.p>{children} </styled.p>
        </Box>
      </Flex>
    </Box>
  );
}

export function ChoosePoolingDuration() {
  const [fieldPoolName] = useField<PoolName>('poolName');
  const [fieldNumberOfCycles] = useField('numberOfCycles');
  const [fieldDelegationDurationType, metaDelegationDurationType, helpersDelegationDurationType] =
    useField('delegationDurationType');
  const [customDuration, setCustomDuration] = useState(false);

  const duration = pools[fieldPoolName.value]?.duration;
  return !customDuration && duration > 0 ? (
    <Step title="Duration">
      <Description>
        <styled.p color="ink.text-subdued">
          The pool looks your STX for {duration} cycle{duration > 1 ? 's' : ''} at the time. You can
          revoke the pool permission at any time and your STX will be unlocked after the end of the
          next cycle.
        </styled.p>
        <styled.p color="ink.text-caption">
          By default, you will be part of the pool until you revoke (indefinite duration). You can
          set a limit to leave the pool automatically{' '}
          <Button
            variant="ghost"
            type="button"
            onClick={() => {
              helpersDelegationDurationType.setValue('limited');
              setCustomDuration(true);
            }}
          >
            here
          </Button>
          .
        </styled.p>
      </Description>
    </Step>
  ) : (
    <Step title="Duration">
      <Description>
        <styled.p color="ink.text-caption">
          Choose whether you want to pool with a limited duration, or give the pool indefinite
          permission. Each cycles lasts around 15 days.
        </styled.p>
      </Description>

      <Stack gap="space.02" mt="space.05">
        <DurationSelectItem
          title="Indefinite permission"
          icon={<IndefiniteStackingIcon />}
          delegationType="indefinite"
          activeDelegationType={fieldDelegationDurationType.value}
          onChange={val => helpersDelegationDurationType.setValue(val)}
        >
          <styled.p>
            Allow the pool to stack on your behalf for a max of 12 cycles at a time. You can unlock
            them at any moment by revoking the pool permission but keep in mind that your STX will
            be locked until completing the duration initially set by the pool.
          </styled.p>
          <RecommendedFor>
            Users who wish to stack continuously and, when wishing to access STX again, understand
            revocation must be done before funds are re-stacked by pool.
          </RecommendedFor>
        </DurationSelectItem>
        <DurationSelectItem
          title="Limited permission"
          delegationType="limited"
          icon={<LimitedStackingIcon cycles={fieldNumberOfCycles.value || 1} />}
          activeDelegationType={fieldDelegationDurationType.value}
          onChange={val => helpersDelegationDurationType.setValue(val)}
        >
          <styled.p>
            Set a limit between 1 and 12 cycles for how long the pool can stack on your behalf. Make
            sure you don&apos;t set it lower than the number of cycles your pool intends to stack.
          </styled.p>
          {fieldDelegationDurationType.value === 'limited' && <DurationCyclesField />}
          <RecommendedFor>
            Users who want to guarantee funds are not locked beyond a certain period.
          </RecommendedFor>
        </DurationSelectItem>
        {duration > 0 && (
          <styled.p>
            Reset to default indefinite duration{' '}
            <Button
              variant="ghost"
              type="button"
              onClick={() => {
                helpersDelegationDurationType.setValue('indefinite');
                setCustomDuration(false);
              }}
            >
              here
            </Button>
            .
          </styled.p>
        )}
      </Stack>

      {metaDelegationDurationType.touched && metaDelegationDurationType.error && (
        <ErrorLabel mt="base-loose">
          <ErrorText>{metaDelegationDurationType.error}</ErrorText>
        </ErrorLabel>
      )}
    </Step>
  );
}
