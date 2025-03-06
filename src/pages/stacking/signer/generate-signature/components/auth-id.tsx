import React from 'react';

import { Button, Input } from '@leather.io/ui';
import { useField } from 'formik';
import { Box, styled } from 'leather-styles/jsx';

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
        <styled.p color="ink.text-subdued">
          A random number that is used to prevent re-use of the signature
        </styled.p>
      </Description>
      <Box position="relative" my="space.05">
        <Input.Root>
          <Input.Label>Authorisation id</Input.Label>
          <Input.Field id="authId" autoComplete="off" {...field} />
        </Input.Root>
        {meta.touched && meta.error && (
          <ErrorLabel>
            <ErrorText>{meta.error}</ErrorText>
          </ErrorLabel>
        )}
        <Button
          type="button"
          size="sm"
          height="28px"
          right="12px"
          top="18px"
          style={{ position: 'absolute' }}
          width="110px"
          onClick={setRandom}
          // isDisabled={field.value === MAX_U128.toString()}
          zIndex={10}
        >
          Random
        </Button>
      </Box>
    </Step>
  );
}
