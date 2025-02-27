import { useField } from 'formik';
import { styled } from 'leather-styles/jsx';

import { ErrorLabel } from '@components/error-label';
import { ErrorText } from '@components/error-text';

import { CryptoAddressInput } from '../../components/crypto-address-form';

export function CustomPoolAddressInput() {
  const [field, meta] = useField('poolAddress');
  return (
    <>
      <styled.p
        textStyle="body.02"
        color="ink.text-subdued"
        mt="tight"
        display="inline-block"
        lineHeight="18px"
      >
        The pool will provide this address for you.
      </styled.p>
      <CryptoAddressInput
        fieldName="poolAddress"
        addressType="STX"
        placeholder="Pool address"
        {...field}
      >
        {meta.touched && meta.error && (
          <ErrorLabel>
            <ErrorText>{meta.error}</ErrorText>
          </ErrorLabel>
        )}
      </CryptoAddressInput>
    </>
  );
}
