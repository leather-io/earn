import { Box, Input, Stack, Text, color } from '@stacks/ui';
import { useField } from 'formik';

import { ErrorLabel } from '@components/error-label';
import { ErrorText } from '@components/error-text';

import { Description, Step } from '../../components/stacking-form-step';

export function RewardCycleIndex() {
  const [field, meta] = useField('rewardCycleIndex');

  return (
    <Step title="Choose Reward Cycle Index">
      <Description>
        <Stack alignItems="flex-start" spacing="base">
          <Text color={color('text-caption')}>
            The reward cycle index is the identifier of your stacking. It is returned by Stack
            Aggegation Commit action.
          </Text>
        </Stack>
      </Description>

      <Box position="relative" maxWidth="400px">
        <Input
          id="rewardCycleIndex"
          placeholder="Indentifier for the cycle"
          mt="loose"
          {...field}
        />
        {(meta.touched || field) && meta.error && (
          <ErrorLabel>
            <ErrorText>{meta.error}</ErrorText>
          </ErrorLabel>
        )}
      </Box>
    </Step>
  );
}
