import { ClipboardEvent, useState } from 'react';

import { Input, Text, color } from '@stacks/ui';
import { useFormikContext } from 'formik';
import { useGlobalContext } from 'src/context/use-app-context';
import { SignatureJSON } from 'src/pages/stacking/signer/generate-signature/types';

import { ErrorLabel } from '@components/error-label';
import { ErrorText } from '@components/error-text';
import { OpenExternalLinkInNewTab } from '@components/external-link';
import { OpenLinkInNewTab } from '@components/open-link-in-new-tab';
import { createSearch } from '@utils/networks';
import { microStxToStxBigint } from '@utils/unit-convert';

import { Description, Step } from '../../../components/stacking-form-step';
import { StackAggregationCommitFormValues } from '../types';
import { SignerInput } from './signer-input';

export function SignerDetails() {
  const { setFieldValue } = useFormikContext<StackAggregationCommitFormValues>();
  const [error, setError] = useState<string>('');
  const { activeNetwork } = useGlobalContext();

  const fillFromClipboard = (e: ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    setError('');
    if (
      e.clipboardData &&
      e.clipboardData.items.length > 0 &&
      e.clipboardData.items[0].kind === 'string'
    ) {
      const updateValues: FunctionStringCallback = async v => {
        try {
          await setFieldValue('signatureJSON', v);
          const signatureData = JSON.parse(v) as SignatureJSON;
          await setFieldValue('signerKey', signatureData['signerKey']);
          const maxAmount = BigInt(signatureData['maxAmount']);
          await setFieldValue('maxAmount', microStxToStxBigint(maxAmount));
          await setFieldValue('authId', signatureData['authId'], true);
          await setFieldValue('signerSignature', signatureData['signerSignature'], true);
        } catch (e) {
          console.error(e);
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
          <Text color={color('text-caption')}>
            When you engage in Stacking, you&apos;re associating your locked STX with a signer
            actively involved in the Stacks network&apos;s consensus process. With the{' '}
            <OpenExternalLinkInNewTab href="https://www.nakamoto.run/">
              Nakamoto Release
            </OpenExternalLinkInNewTab>
            , Stackers who choose to stack independently will need to run their own signer software.
          </Text>
        </Description>
        <Text mt={'loose'} color={color('text-caption')}>
          If you&apos;re interested in running your own signer, please consult{' '}
          <OpenExternalLinkInNewTab href="https://docs.stacks.co/nakamoto-upgrade/signing-and-stacking/stacking-flow">
            these documents
          </OpenExternalLinkInNewTab>{' '}
          on how to Stack as a signer and fill out{' '}
          <OpenLinkInNewTab
            href={`/signer/generate-signature${createSearch(activeNetwork)}`}
            display="inline-block"
          >
            this page
          </OpenLinkInNewTab>{' '}
          to generate a signer signature. If you prefer not to manage your own signer, we suggest{' '}
          <OpenLinkInNewTab
            href={`/start-pooled-stacking${createSearch(activeNetwork)}`}
            display="inline-block"
          >
            Stacking using another method
          </OpenLinkInNewTab>
          . Users who are not running their own signer software will need to request this data from
          the signer that you&apos;re using. Enter the data you receive here:
        </Text>
        <Input onPaste={fillFromClipboard} placeholder="paste here.." />
        {error && (
          <ErrorLabel>
            <ErrorText>{error}</ErrorText>
          </ErrorLabel>
        )}
        <Text mt={'loose'} color={color('text-caption')}>
          Alternatively, enter the information manually.
        </Text>

        <SignerInput
          title="Signer Public Key"
          text={
            <Text color={color('text-caption')}>
              Enter the signer&apos;s public key in hexadecimal format:
            </Text>
          }
          placeholder="public key 0x1234..ef"
          fieldName="signerKey"
        />
        <SignerInput
          title="Signer Signature (optional)"
          text={
            <Text color={color('text-caption')}>
              Enter the hexadecimal signature from the signer enabling you to Stack with their key.
              Leave this field blank if the signature is universal for all Stackers who use this
              signer:
            </Text>
          }
          placeholder="signature 0x1234..0123..ef"
          fieldName="signerSignature"
        />
        <SignerInput
          title="Max Amount"
          text={
            <Text color={color('text-caption')}>
              Enter the maximum amount of STX that can be locked while using this signature:
            </Text>
          }
          placeholder="Maximum amount of STX to lock"
          fieldName="maxAmount"
        />
        <SignerInput
          title="Auth ID"
          text={
            <Text color={color('text-caption')}>
              Enter the signer&apos;s Auth ID, a randomly generated number that prevents signer
              signature reuse:
            </Text>
          }
          placeholder="value provided by signer"
          fieldName="authId"
        />
      </Step>
    </>
  );
}
