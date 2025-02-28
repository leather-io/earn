import { Input } from '@leather.io/ui';
import { useField } from 'formik';
import { Box, Stack, styled } from 'leather-styles/jsx';

import { ErrorLabel } from '@components/error-label';
import { ErrorText } from '@components/error-text';

import { Description, Step } from '../../components/stacking-form-step';

export function RewardCycleIndex() {
  const [field, meta] = useField('rewardCycleIndex');

  return (
    <Step title="Choose Reward Cycle Index">
      <Description>
        <Stack alignItems="flex-start" gap="space.02">
          <styled.p color="ink.text-subdued">
            The reward cycle index is the identifier of your stacking. It is returned by Stack
            Aggegation Commit action.
          </styled.p>
        </Stack>
      </Description>

      <Box position="relative" maxWidth="400px" mt="space.05">
        <Input.Root>
          <Input.Label>Identifier for the cycle</Input.Label>
          <Input.Field id="rewardCycleIndex" autoComplete="off" {...field} />
        </Input.Root>
        {(meta.touched || field) && meta.error && (
          <ErrorLabel>
            <ErrorText>{meta.error}</ErrorText>
          </ErrorLabel>
        )}
      </Box>
    </Step>
  );
}
