import React, { createContext, useMemo } from 'react';
import { Form, Formik } from 'formik';
import { Pox4SignatureTopic } from '@stacks/stacking';
import { useAuth } from '@components/auth-provider/auth-provider';
import { GenerateSignatureLayout } from './components/generate-signature-layout';
import { useGenerateStackingSignature } from '../../../hooks/use-generate-signature';
import { useParams } from 'react-router-dom';
import { GenerateSignatureFields, MAX_U128 } from './types';
import { CenteredSpinner } from '@components/centered-spinner';
import { useGetPoxInfoQuery } from '@components/stacking-client-provider/stacking-client-provider';
import { CenteredErrorAlert } from '@components/centered-error-alert';
import { SignatureData } from '@stacks/connect';
import { createValidationSchema } from './utils';
import { useStacksNetwork } from '@hooks/use-stacks-network';

const initialFormValues: GenerateSignatureFields = {
  topic: Pox4SignatureTopic.StackStx,
  period: 1,
  rewardCycleId: 1,
  poxAddress: 'bc1qultv5ks9qcyxxwcnkfmpdh4y9u0tpw6s4mng7v',
  maxAmount: MAX_U128.toString(),
  authId: '',
};

const _SignatureDataContext = createContext<{ signature: SignatureData | null }>({
  signature: null,
});

export function GenerateSignerKeySignature() {
  const { topic } = useParams();
  const topicDefault = useMemo(() => {
    if (topic === Pox4SignatureTopic.AggregateCommit) return Pox4SignatureTopic.AggregateCommit;
    if (topic === Pox4SignatureTopic.StackExtend) return Pox4SignatureTopic.StackExtend;
    if (topic === Pox4SignatureTopic.StackStx) return Pox4SignatureTopic.StackStx;
    console.warn(`Received invalid topic parameter: ${topic}`);
    return Pox4SignatureTopic.StackStx;
  }, [topic]);
  const authIdDefault = useMemo(() => {
    return Math.floor(Math.random() * 1000000);
  }, []);
  const getPoxInfoQuery = useGetPoxInfoQuery();
  const { btcAddressP2wpkh } = useAuth();
  const { openSignatureRequest, signatureData } = useGenerateStackingSignature();
  const { networkName } = useStacksNetwork();

  if (getPoxInfoQuery.isLoading) return <CenteredSpinner />;

  if (getPoxInfoQuery.isError || !getPoxInfoQuery.data) {
    const msg = 'Failed to load necessary data.';
    const id = '8c12f6b2-c839-4813-8471-b0fd542b845f';
    console.error(id, msg);
    return <CenteredErrorAlert id={id}>{msg}</CenteredErrorAlert>;
  }

  const validationSchema = createValidationSchema({ network: networkName });

  return (
    <Formik
      initialValues={{
        ...initialFormValues,
        poxAddress: btcAddressP2wpkh ?? '',
        rewardCycleId: getPoxInfoQuery.data.reward_cycle_id,
        topic: topicDefault,
        authId: authIdDefault,
      }}
      onSubmit={async values => {
        // handleSubmit(values);
        console.log(values);
        await openSignatureRequest({
          poxAddress: values.poxAddress,
          period: values.period,
          rewardCycle: values.rewardCycleId,
          topic: values.topic,
        });
      }}
      validationSchema={validationSchema}
    >
      <Form>
        <GenerateSignatureLayout signatureData={signatureData} />
      </Form>
    </Formik>
  );
}
