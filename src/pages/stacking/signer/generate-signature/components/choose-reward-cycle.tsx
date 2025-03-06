import { Input } from '@leather.io/ui';
import { useField } from 'formik';
import { Box, Stack, styled } from 'leather-styles/jsx';
import { Description, Step } from 'src/pages/stacking/components/stacking-form-step';

import { ErrorAlert } from '@components/error-alert';
import { ErrorLabel } from '@components/error-label';
import { ErrorText } from '@components/error-text';
import { useGetPoxInfoQuery } from '@components/stacking-client-provider/stacking-client-provider';

export function RewardCycle() {
  const getPoxInfoQuery = useGetPoxInfoQuery();

  const [field, meta] = useField('rewardCycleId');
  const [_topic, topicMeta] = useField('topic');

  if (getPoxInfoQuery.isError || !getPoxInfoQuery.data) {
    const id = '134098d7-444b-4591-abfe-8767af6def3f';
    const msg = 'Failed to load necessary data.';
    console.error(id, msg);
    return <ErrorAlert id={id}>{msg}</ErrorAlert>;
  }

  return (
    <Step title="Choose reward cycle">
      <Description>
        <Stack alignItems="flex-start" gap="space.04">
          <styled.p color="ink.text-subdued">
            Next cycle is {getPoxInfoQuery.data.reward_cycle_id + 1}
          </styled.p>
        </Stack>
      </Description>

      <Box position="relative" maxWidth="400px" mt="space.05">
        <Input.Root>
          <Input.Label>Next cycle</Input.Label>
          <Input.Field id="rewardCycle" autoComplete="off" {...field} />
        </Input.Root>
        {(meta.touched || topicMeta.touched) && meta.error && (
          <ErrorLabel>
            <ErrorText>{meta.error}</ErrorText>
          </ErrorLabel>
        )}
      </Box>
    </Step>
  );
}
