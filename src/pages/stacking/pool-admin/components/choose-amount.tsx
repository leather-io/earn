import { Input } from '@leather.io/ui';
import { useField } from 'formik';
import { Box, styled } from 'leather-styles/jsx';
import { Stack } from 'leather-styles/jsx';

import { ErrorAlert } from '@components/error-alert';
import { ErrorLabel } from '@components/error-label';
import { ErrorText } from '@components/error-text';
import { useGetPoxInfoQuery } from '@components/stacking-client-provider/stacking-client-provider';

import { Description, Step } from '../../components/stacking-form-step';
import { Balances } from './balances';

export function Amount() {
  const getPoxInfoQuery = useGetPoxInfoQuery();
  const [field, meta] = useField('amount');

  if (getPoxInfoQuery.isError || !getPoxInfoQuery.data) {
    const id = '134098d7-444b-4591-abfe-8767af6def3f';
    const msg = 'Failed to load necessary data.';
    console.error(id, msg);
    return <ErrorAlert id={id}>{msg}</ErrorAlert>;
  }

  return (
    <Step title="Choose amount">
      <Description>
        <Stack alignItems="flex-start" gap="space.02">
          <styled.p>
            Must be less than or equal to the delegated amount and the stacker&apos;s balance.
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
      </Box>
      <Balances />
    </Step>
  );
}
