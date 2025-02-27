import React from 'react';

import { useField } from 'formik';
import { Box, styled } from 'leather-styles/jsx';

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
        <styled.p color="ink.text-subdued">
          Select the topic (stacking method) for this signature
        </styled.p>
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
            color: 'ink.text-subdued',
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
