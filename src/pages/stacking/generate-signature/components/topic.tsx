import { useField } from 'formik';
import { Description, Step } from '../../components/stacking-form-step';
import { Box, Text } from '@stacks/ui';

export function Topic() {
  const [field, _meta] = useField('topic');
  // const form = useFormikContext<{ topic: string }>();
  return (
    <Step title="Topic">
      <Description>
        <Text>Select the topic (stacking method) for this signature</Text>
      </Description>
      <Box border="1px solid var(--colors-border)" padding="2px">
        <select
          {...field}
          id="topic"
          name="topic"
          value={field.value}
          style={{ background: 'none', width: '100%' }}
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
