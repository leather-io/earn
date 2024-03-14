import { useField } from 'formik';
import { Description, Step } from '../../components/stacking-form-step';
import { Box, Button, Input, Text } from '@stacks/ui';
import React from 'react';
import { ErrorLabel } from '@components/error-label';
import { ErrorText } from '@components/error-text';

export function AuthId() {
  const [field, meta, helpers] = useField('authId');
  // const form = useFormikContext<{ topic: string }>();
  const setRandom = React.useCallback(() => {
    helpers.setValue(Math.floor(Math.random() * 10000000));
  }, [helpers]);
  return (
    <Step title="Auth ID">
      <Description>
        <Text>A random number that is used to prevent re-use of the signature</Text>
      </Description>
      <Box position="relative" my="loose">
        <Input id="authId" placeholder="Maximum amount of STX to lock" {...field} />
        {meta.touched && meta.error && (
          <ErrorLabel>
            <ErrorText>{meta.error}</ErrorText>
          </ErrorLabel>
        )}
        <Button
          type="button"
          mode="tertiary"
          size="sm"
          height="28px"
          right="12px"
          top="10px"
          style={{ position: 'absolute' }}
          width="110px"
          onClick={setRandom}
          // isDisabled={field.value === MAX_U128.toString()}
        >
          Random
        </Button>
      </Box>
    </Step>
  );
}
