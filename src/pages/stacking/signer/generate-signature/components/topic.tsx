import { Box, Text, color } from '@stacks/ui';
import { useField } from 'formik';

import { Description, Step } from '../../../components/stacking-form-step';

export function Topic() {
  const [field, _meta] = useField('topic');
  return (
    <Step title="Topic">
      <Description>
        <Text color={color('text-caption')}>
          Select the topic (stacking method) for this signature
        </Text>
      </Description>
      <Box border="1px solid var(--colors-border)" padding="2px">
        <select
          {...field}
          id="topic"
          name="topic"
          value={field.value}
          style={{ background: 'none', width: '100%', color: color('text-caption') }}
        >
          <option value="stack-stx">stack-stx</option>
          <option value="agg-commit">stack-aggregation-commit</option>
          <option value="stack-extend">stack-extend</option>
          <option value="stack-increase">stack-increase</option>
        </select>
      </Box>
    </Step>
  );
}
