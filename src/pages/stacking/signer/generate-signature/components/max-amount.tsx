import React from 'react';

import { Button, Input } from '@leather.io/ui';
import { useField } from 'formik';
import { Box, styled } from 'leather-styles/jsx';

import { ErrorLabel } from '@components/error-label';
import { ErrorText } from '@components/error-text';

import { Description, Step } from '../../../components/stacking-form-step';
import { MAX_U128 } from '../types';

export function MaxAmount() {
  const [field, meta, helpers] = useField('maxAmount');
  const setMax = React.useCallback(() => {
    helpers.setValue(MAX_U128.toString());
  }, [helpers]);
  return (
    <Step title="Max Amount">
      <Description>
        <styled.p color="ink.text-subdued">
          Enter the maximum amount of STX that can be locked while using this signature
        </styled.p>
      </Description>
      <Box position="relative" my="space.05">
        <Input.Root>
          <Input.Label>Maximum amount of STX to lock</Input.Label>
          <Input.Field id="maxAmount" autoComplete="off" {...field} />
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
          onClick={setMax}
          disabled={field.value === MAX_U128.toString()}
          zIndex={10}
        >
          Max Amount
        </Button>
      </Box>
    </Step>
  );
}
