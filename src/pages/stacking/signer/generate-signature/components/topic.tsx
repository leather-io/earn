import React from 'react';

import { Box, Text, color } from '@stacks/ui';
import { useField } from 'formik';

import { Description, Step } from '../../../components/stacking-form-step';

export function Topic() {
  const [field, _meta] = useField('topic');
  const [_period, _periodMeta, periodHelpers] = useField('period');

  React.useEffect(() => {
    if (field.value === 'agg-commit' || field.value === 'agg-increase') {
      periodHelpers.setValue(1);
    }
  }, [field.value, periodHelpers]);

  return (
    <Step title="Topic">
      <Description>
        <Text color={color('text-caption')}>
          Select the topic (stacking method) for this signature
        </Text>
      </Description>
      <Box
        border="1px solid var(--colors-border)"
        borderRadius={'5px'}
        padding="14px 16px"
        my="loose"
      >
        <select
          {...field}
          id="topic"
          name="topic"
          value={field.value}
          style={{
            background: 'none',
            width: '100%',
            color: color('text-caption'),
            fontSize: '14px',
          }}
        >
          <option value="stack-stx">stack-stx</option>
          <option value="agg-commit">stack-aggregation-commit</option>
          <option value="stack-extend">stack-extend</option>
          <option value="stack-increase">stack-increase</option>
          <option value="agg-increase">stack-aggregation-increase</option>
        </select>
      </Box>
    </Step>
  );
}
