import { useField } from 'formik';
import { styled } from 'leather-styles/jsx';

import { ErrorLabel } from '@components/error-label';
import { ErrorText } from '@components/error-text';
import { MAX_STACKING_CYCLES, MIN_STACKING_CYCLES } from '@constants/app';

import { OneCycleDescriptor } from '../../components/one-cycle-descriptor';
import { Description, Step } from '../../components/stacking-form-step';
import { Stepper } from '../../components/stepper';

export function Duration({ fieldName, description }: { fieldName?: string; description?: string }) {
  const [field, meta, helpers] = useField(fieldName || 'lockPeriod');
  return (
    <>
      <Step title="Duration">
        <Description>
          <styled.p color="ink.text-subdued">
            {description || 'Number of cycles to lock STX for this stacker'}
          </styled.p>
        </Description>

        <Stepper
          mt="loose"
          amount={field.value}
          onIncrement={cycle => {
            if (cycle > MAX_STACKING_CYCLES) return;
            helpers.setValue(cycle);
          }}
          onDecrement={cycle => {
            if (cycle < MIN_STACKING_CYCLES) return;
            helpers.setValue(cycle);
          }}
        />
        <OneCycleDescriptor mt="loose" />
        {meta.error && (
          <ErrorLabel>
            <ErrorText>{meta.error}</ErrorText>
          </ErrorLabel>
        )}
      </Step>
    </>
  );
}
