import React from 'react';

import { Box, Button, Input, Text } from '@stacks/ui';
import { useField } from 'formik';

import { ErrorLabel } from '@components/error-label';
import { ErrorText } from '@components/error-text';

import { Description, Step } from '../../../components/stacking-form-step';

export function AuthId() {
  const [field, meta, helpers] = useField('authId');
  const setRandom = React.useCallback(() => {
    helpers.setValue(Math.floor(Math.random() * 10000000));
  }, [helpers]);
  return (
    <Step title="Auth ID">
      <Description>
        <Text>A random number that is used to prevent re-use of the signature</Text>
      </Description>
      <Box position="relative" my="loose">
        <Input id="authId" placeholder="Authorisation id" {...field} />
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
