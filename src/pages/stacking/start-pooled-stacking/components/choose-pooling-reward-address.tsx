import { useField } from 'formik';
import { Box, styled } from 'leather-styles/jsx';

import { ErrorLabel } from '@components/error-label';
import { ErrorText } from '@components/error-text';

import { CryptoAddressInput } from '../../components/crypto-address-form';
import { Description, Step } from '../../components/stacking-form-step';

interface Props {
  editable: boolean;
  btcAddress: string;
}
export function ChoosePoolingRewardAddress({ editable }: Props) {
  const [field, meta] = useField('rewardAddress');

  return (
    <Step title="Bitcoin address">
      <Description>
        <styled.p color="ink.text-subdued">
          Enter the Bitcoin address where you&apos;d like to receive your rewards.
        </styled.p>
      </Description>

      <Box position="relative" maxWidth="400px">
        <CryptoAddressInput
          fieldName="poxAddress"
          addressType="BTC"
          isDisabled={!editable}
          {...field}
        >
          {meta.touched && meta.error && (
            <ErrorLabel>
              <ErrorText>{meta.error}</ErrorText>
            </ErrorLabel>
          )}
        </CryptoAddressInput>
      </Box>
      {editable ? (
        <styled.p textStyle="body.small" color="yellow.action-primary-default" mt="base-tight">
          Make sure you control this BTC address. It is written on-chain and pool operators use the
          address as is.
        </styled.p>
      ) : (
        <styled.p textStyle="body.small" color="ink.text-subdued" mt="base-tight">
          This is your BTC address.
        </styled.p>
      )}
    </Step>
  );
}
