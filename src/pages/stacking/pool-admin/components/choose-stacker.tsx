import { Input } from '@leather.io/ui';
import { useField } from 'formik';
import { Box, Stack, styled } from 'leather-styles/jsx';

import { ErrorLabel } from '@components/error-label';
import { ErrorText } from '@components/error-text';

import { Description, Step } from '../../components/stacking-form-step';

export function Stacker() {
  const [field, meta] = useField('stacker');

  return (
    <Step title="Stacker">
      <Description>
        <Stack alignItems="flex-start" gap="space.02">
          <styled.p>The stacks address of your pool member.</styled.p>
        </Stack>
      </Description>

      <Box position="relative" maxWidth="400px" mt="space.05">
        <Input.Root>
          <Input.Label>Stacks address</Input.Label>
          <Input.Field id="stacker" autoComplete="off" {...field} />
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
