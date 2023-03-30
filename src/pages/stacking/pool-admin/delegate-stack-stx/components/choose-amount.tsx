import { Box, Input, Stack, Text } from '@stacks/ui';
import { useField } from 'formik';
import { Description, Step } from 'src/pages/stacking/components/stacking-form-step';

import { ErrorLabel } from '@components/error-label';
import { ErrorText } from '@components/error-text';

export function Amount() {
  const [field, meta] = useField('amount');

  return (
    <Step title="Choose amount">
      <Description>
        <Stack alignItems="flex-start" spacing="base">
          <Text>Must be less than the delegated amount and the stacker&apos;s balance.</Text>
        </Stack>
      </Description>

      <Box position="relative" maxWidth="400px">
        <Input id="stxAmount" placeholder="Amount of STX to Stack" mt="loose" {...field} />
        {meta.touched && meta.error && (
          <ErrorLabel>
            <ErrorText>{meta.error}</ErrorText>
          </ErrorLabel>
        )}
      </Box>
    </Step>
  );
}
