import { ClipboardEvent, useState } from 'react';

import { Input } from '@leather.io/ui';
import { useFormikContext } from 'formik';
import { Box, styled } from 'leather-styles/jsx';
import { useGlobalContext } from 'src/context/use-app-context';
import { SignatureJSON } from 'src/pages/stacking/signer/generate-signature/types';

import { ErrorLabel } from '@components/error-label';
import { ErrorText } from '@components/error-text';
import { OpenExternalLinkInNewTab } from '@components/external-link';
import { Link } from '@components/link';
import { createSearch } from '@utils/networks';
import { microStxToStxBigint } from '@utils/unit-convert';

import { Description, Step } from '../../../components/stacking-form-step';
import { StackAggregationCommitFormValues } from '../types';
import { SignerInput } from './signer-input';

export function SignerDetails() {
  const { setValues } = useFormikContext<StackAggregationCommitFormValues>();
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
          const signatureData = JSON.parse(v) as SignatureJSON;
          const maxAmount = BigInt(signatureData['maxAmount']);
          setValues(
            existing => ({
              ...existing,
              signatureJSON: v,
              signerKey: signatureData['signerKey'],
              maxAmount: microStxToStxBigint(maxAmount),
              authId: signatureData['authId'],
              signerSignature: signatureData['signerSignature'],
            }),
            true
          );
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
          <styled.p color="ink.text-subdued">
            When you engage in Stacking, you&apos;re associating your locked STX with a signer
            actively involved in the Stacks network&apos;s consensus process. With the{' '}
            <OpenExternalLinkInNewTab href="https://www.nakamoto.run/">
              Nakamoto Release
            </OpenExternalLinkInNewTab>
            , Stackers who choose to stack independently will need to run their own signer software.
          </styled.p>
        </Description>
        <styled.p mt="space.05" color="ink.text-subdued">
          If you&apos;re interested in running your own signer, please consult{' '}
          <OpenExternalLinkInNewTab
            href="https://docs.stacks.co/nakamoto-upgrade/signing-and-stacking/stacking-flow"
            display="inline"
          >
            these documents
          </OpenExternalLinkInNewTab>{' '}
          on how to Stack as a signer and fill out{' '}
          <Link to={`/signer/generate-signature${createSearch(activeNetwork)}`} display="inline">
            this page
          </Link>{' '}
          to generate a signer signature.
        </styled.p>
        <styled.p mt="space.05" color="ink.text-subdued">
          If you prefer to delegate your involvement in the consensus process to a third party and
          to not manage your own signer, we suggest to either use the dapp created by DegenLabs for{' '}
          <OpenExternalLinkInNewTab href="https://solo.stacking.tools/">
            independent stacking
          </OpenExternalLinkInNewTab>{' '}
          without needing a signer, as DegenLabs operates a signer, or to choose a different
          stacking method.
        </styled.p>
        <Box my="space.05">
          <Input.Root>
            <Input.Label>Paste signature JSON here..</Input.Label>
            <Input.Field autoComplete="off" onPaste={fillFromClipboard} />
          </Input.Root>
        </Box>
        {error && (
          <ErrorLabel>
            <ErrorText>{error}</ErrorText>
          </ErrorLabel>
        )}
        <styled.p mb="space.05" color="ink.text-subdued">
          Alternatively, enter the information manually.
        </styled.p>

        <SignerInput
          title="Signer Public Key"
          text={
            <styled.p color="ink.text-subdued">
              Enter the signer&apos;s public key in hexadecimal format:
            </styled.p>
          }
          placeholder="public key 0x1234..ef"
          fieldName="signerKey"
        />
        <SignerInput
          title="Signer Signature (optional)"
          text={
            <styled.p color="ink.text-subdued">
              Enter the hexadecimal signature from the signer enabling you to Stack with their key.
              Leave this field blank if the signature is universal for all Stackers who use this
              signer:
            </styled.p>
          }
          placeholder="signature 0x1234..0123..ef"
          fieldName="signerSignature"
        />
        <SignerInput
          title="Max Amount"
          text={
            <styled.p color="ink.text-subdued">
              Enter the maximum amount of STX that can be locked while using this signature:
            </styled.p>
          }
          placeholder="Maximum amount of STX to lock"
          fieldName="maxAmount"
        />
        <SignerInput
          title="Auth ID"
          text={
            <styled.p color="ink.text-subdued">
              Enter the signer&apos;s Auth ID, a randomly generated number that prevents signer
              signature reuse:
            </styled.p>
          }
          placeholder="value provided by signer"
          fieldName="authId"
        />
      </Step>
    </>
  );
}
