import { ErrorLabel } from '@components/error-label';
import { ErrorText } from '@components/error-text';
import { Input, Text } from '@stacks/ui';
import { useFormikContext } from 'formik';
import { ClipboardEvent, useState } from 'react';

import { Description, Step } from '../../../components/stacking-form-step';
import { StackAggregationCommitFormValues } from '../types';
import { SignerInput } from './signer-input';

export function SignerDetails() {
  const { setFieldValue } = useFormikContext<StackAggregationCommitFormValues>();
  const [error, setError] = useState<string>('');

  const fillFromClipboard = (e: ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    setError('');
    if (
      e.clipboardData &&
      e.clipboardData.items.length > 0 &&
      e.clipboardData.items[0].kind === 'string'
    ) {
      const updateValues: FunctionStringCallback = v => {
        try {
          const signatureData = JSON.parse(v);
          setFieldValue('signerKey', signatureData['publicKey']);
          setFieldValue('signerSignature', signatureData['signature']);
          setFieldValue('maxAmount', signatureData['maxAmount']);
          setFieldValue('authId', signatureData['authId']);
        } catch (e) {
          setError('Invalid signer data');
        }
      };
      e.clipboardData.items[0].getAsString(updateValues);
    }
  };
  return (
    <>
      <Step title="Signer Information">
        <Description>
          <Text>
            When you participate in Stacking, you're associating your locked Stacks with a signer
            that is participating in consensus on the Stacks network.
          </Text>
        </Description>
        <Text mt={'loose'}>
          If you aren't running your own signer, you'll need to request this information from the
          signer you're using. Paste the received information here:
        </Text>
        <Input onPaste={fillFromClipboard} placeholder="paste here.." />
        {error && (
          <ErrorLabel>
            <ErrorText>{error}</ErrorText>
          </ErrorLabel>
        )}
        <Text mt={'loose'}>Alternatively, enter the information manually.</Text>

        <SignerInput
          title="Signer Public Key"
          text={<Text>Enter the public key of the signer in hexadecimal format</Text>}
          placeholder="public key 0x1234..ef"
          fieldName="signerKey"
        />
        <SignerInput
          title="Signer Signature (optional)"
          text={
            <Text>
              Enter a signature (in hexadecimal format) you've received from the signer, which is
              allowing you to Stack using their signer key. Leave it empty, if the signature is the
              same for all stackers.
            </Text>
          }
          placeholder="signature 0x1234..0123..ef"
          fieldName="signerSignature"
        />
        <SignerInput
          title="Max Amount"
          text={
            <Text>
              Enter the maximum amount of STX that can be locked while using this signature.
            </Text>
          }
          placeholder="Maximum amount of STX to lock"
          fieldName="maxAmount"
        />
        <SignerInput
          title="Auth ID"
          text={
            <Text>Enter the random number that is used to prevent re-use of the signature</Text>
          }
          placeholder="value provided by signer"
          fieldName="authId"
        />
      </Step>
    </>
  );
}
