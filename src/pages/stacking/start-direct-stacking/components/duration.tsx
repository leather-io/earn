import { Text, color } from '@stacks/ui';
import { useField } from 'formik';

import { ErrorLabel } from '@components/error-label';
import { ErrorText } from '@components/error-text';
import { OpenExternalLinkInNewTab } from '@components/external-link';
import { MAX_STACKING_CYCLES, MIN_STACKING_CYCLES } from '@constants/app';

import { OneCycleDescriptor } from '../../components/one-cycle-descriptor';
import { Description, Step } from '../../components/stacking-form-step';
import { Stepper } from '../../components/stepper';

export function Duration() {
  const [field, meta, helpers] = useField('lockPeriod');
  const [sigData] = useField('signatureJSON');
  return (
    <>
      <Step title="Duration">
        <Description>
          <Text color={color('text-caption')}>
            Every cycle, each of your reward slots will be eligible for rewards. After your chosen
            duration, you&apos;ll need to wait one cycle before you can stack from this address
            again.{' '}
            <OpenExternalLinkInNewTab href="https://docs.stacks.co/concepts/block-production/stacking">
              Learn more about cycles.
            </OpenExternalLinkInNewTab>
          </Text>
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
        {(meta.touched || sigData.value) && meta.error && (
          <ErrorLabel>
            <ErrorText>{meta.error}</ErrorText>
          </ErrorLabel>
        )}
      </Step>
    </>
  );
}
