import { Box, Input, Text } from '@stacks/ui';
import { useField } from 'formik';

import { Description, Step } from '../../../components/stacking-form-step';
import { ErrorLabel } from '@components/error-label';
import { ErrorText } from '@components/error-text';
import { Title } from '@components/title';

export function SignerKey() {
  const [fieldKey, metaKey] = useField('signerKey');
  const [fieldSignature, metaSignature] = useField('signerSignature');

  return (
    <>
      <Step title="Signer Information">
        <Description>
          <Text>
            When you participate in Stacking, you're associating your locked Stacks with a signer
            that is participating in consensus on the Stacks network.
          </Text>
          <Text>
            If you aren't running your own signer, you'll need to request this information from the
            signer you're using.
          </Text>
        </Description>
        <Title fontSize="20px">Signer Public Key</Title>
        <Text>Enter the public key of the signer in hexadecimal format</Text>
        <Box position="relative" maxWidth="400px">
          <Input {...fieldKey} mt={'loose'} placeholder="public key 0x1234..ef" />
          {metaKey.touched && metaKey.error && (
            <ErrorLabel>
              <ErrorText>{metaKey.error}</ErrorText>
            </ErrorLabel>
          )}
        </Box>
        <Title fontSize="20px">Signer Signature (optional)</Title>
        <Text>
          Enter the signature (in hexadecimal format) you've received from the signer, which is
          allowing you to Stack using their signer key.
        </Text>
        <Box position="relative" maxWidth="400px">
          <Input {...fieldSignature} mt={'loose'} placeholder="signature 0x1234..ef" />
          {metaSignature.touched && metaSignature.error && (
            <ErrorLabel>
              <ErrorText>{metaSignature.error}</ErrorText>
            </ErrorLabel>
          )}
        </Box>
      </Step>
    </>
  );
}
