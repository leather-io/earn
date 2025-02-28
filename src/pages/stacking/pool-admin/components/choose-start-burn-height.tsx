import { Input } from '@leather.io/ui';
import { useField } from 'formik';
import { Box, Stack, styled } from 'leather-styles/jsx';

import { ErrorAlert } from '@components/error-alert';
import { ErrorLabel } from '@components/error-label';
import { ErrorText } from '@components/error-text';
import { useGetPoxInfoQuery } from '@components/stacking-client-provider/stacking-client-provider';

import { Description, Step } from '../../components/stacking-form-step';

export function StartBurnHeight() {
  const getPoxInfoQuery = useGetPoxInfoQuery();

  const [field, meta] = useField('startBurnHt');

  if (getPoxInfoQuery.isError || !getPoxInfoQuery.data) {
    const id = '134098d7-444b-4591-abfe-8767af6def3f';
    const msg = 'Failed to load necessary data.';
    console.error(id, msg);
    return <ErrorAlert id={id}>{msg}</ErrorAlert>;
  }

  return (
    <Step title="Choose start burn height">
      <Description>
        <Stack alignItems="flex-start" gap="space.02">
          <styled.p>
            Current burn height is {getPoxInfoQuery.data.current_burnchain_block_height}. The value
            must be in the future and before the anchor block of the next cycle. Add for example 10
            blocks.
          </styled.p>
        </Stack>
      </Description>

      <Box position="relative" maxWidth="400px" mt="space.05">
        <Input.Root>
          <Input.Label>Bitcoin block</Input.Label>
          <Input.Field id="startBurnHt" autoComplete="off" {...field} />
        </Input.Root>
        {meta.touched && meta.error && (
          <ErrorLabel>
            <ErrorText>{meta.error}</ErrorText>
          </ErrorLabel>
        )}
      </Box>
    </Step>
  );
}
