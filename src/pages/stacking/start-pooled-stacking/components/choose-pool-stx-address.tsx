import { useField } from 'formik';
import { styled } from 'leather-styles/jsx';

import { ErrorLabel } from '@components/error-label';
import { ErrorText } from '@components/error-text';
import { OpenExternalLinkInNewTab } from '@components/external-link';

import { CryptoAddressInput } from '../../components/crypto-address-form';
import { Description, Step } from '../../components/stacking-form-step';

export function ChoosePoolAddress() {
  const [field, meta] = useField('poolAddress');
  return (
    <Step title="Pool address">
      <Description>
        <styled.p>
          Enter the STX address of the pool with which you&apos;d like to Stack without your STX
          leaving your wallet.
        </styled.p>
        <styled.p>
          The pool will provide this address for you. Pools can have different addresses that
          correspond to particular durations.
        </styled.p>
        <OpenExternalLinkInNewTab href="https://stacks.co/stacking#services">
          Discover pools on stacks.co
        </OpenExternalLinkInNewTab>
      </Description>
      <CryptoAddressInput fieldName="poolAddress" placeholder="Pool address" {...field}>
        {meta.touched && meta.error && (
          <ErrorLabel>
            <ErrorText>{meta.error}</ErrorText>
          </ErrorLabel>
        )}
      </CryptoAddressInput>
    </Step>
  );
}
