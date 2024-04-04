import { useState } from 'react';

import { StackingClient } from '@stacks/stacking';
import { Form, Formik } from 'formik';

import { useAuth } from '@components/auth-provider/auth-provider';
import { CenteredErrorAlert } from '@components/centered-error-alert';
import { CenteredSpinner } from '@components/centered-spinner';
import {
  useGetSecondsUntilNextCycleQuery,
  useStackingClient,
} from '@components/stacking-client-provider/stacking-client-provider';
import { useNavigate } from '@hooks/use-navigate';
import { useStacksNetwork } from '@hooks/use-stacks-network';

import { StackingFormContainer } from '../components/stacking-form-container';
import { StackingFormInfoPanel } from '../components/stacking-form-info-panel';
import { StartStackingLayout } from '../components/stacking-layout';
import { ChooseStackingAmount } from './components/choose-stacking-amount';
import { ChooseStackingProtocol } from './components/choose-stacking-protocol';
import { ConfirmAndSubmit } from './components/confirm-and-stack';
import { ProtocolInfoCard } from './components/liquid-stacking-info-card';
import { LiquidStackingIntro } from './components/liquid-stacking-intro';
import { EditingFormValues } from './types';
import {
  createHandleSubmit as createHandleStackStxSubmit,
  createValidationSchema,
} from './utils-liquid-stacking-stx';

const initialDelegatingFormValues: Partial<EditingFormValues> = {
  amount: '',
  stxAddress: '',
  protocolAddress: '',
};

export function StartLiquidStacking() {
  const { client } = useStackingClient();
  const { address } = useAuth();
  const { networkName } = useStacksNetwork();

  if (!address) {
    const msg = 'Expected `address` to be defined.';
    console.error(msg);
    return <CenteredErrorAlert>{msg}</CenteredErrorAlert>;
  }
  if (!client) {
    const msg = 'Expected `client` to be defined.';
    console.error(msg);
    return <CenteredErrorAlert>{msg}</CenteredErrorAlert>;
  }
  if (!networkName) {
    const msg = 'Expected `networkName` to be defined.';
    console.error(msg);
    return <CenteredErrorAlert>{msg}</CenteredErrorAlert>;
  }

  return <StartLiquidStackingLayout client={client} currentAccountAddresses={{ address }} />;
}

interface StartLiquidStackingProps {
  client: StackingClient;
  currentAccountAddresses: {
    address: string;
  };
}
function StartLiquidStackingLayout({ client, currentAccountAddresses }: StartLiquidStackingProps) {
  const { network } = useStacksNetwork();
  const [isContractCallExtensionPageOpen, setIsContractCallExtensionPageOpen] = useState(false);

  const getSecondsUntilNextCycleQuery = useGetSecondsUntilNextCycleQuery();
  const navigate = useNavigate();

  const validationSchema = createValidationSchema();
  const handleStackStxSubmit = createHandleStackStxSubmit({
    client,
    network,
    navigate,
    setIsContractCallExtensionPageOpen,
  });

  if (getSecondsUntilNextCycleQuery.isLoading) return <CenteredSpinner />;

  if (
    getSecondsUntilNextCycleQuery.isError ||
    typeof getSecondsUntilNextCycleQuery.data !== 'number'
  ) {
    const id = '0106e9bf-ae2f-4fcc-bf00-5fe083001adb';
    const msg = 'Failed to load necessary data.';
    // TODO: log error
    console.error(id, msg);
    return <CenteredErrorAlert id={id}>{msg}</CenteredErrorAlert>;
  }

  return (
    <Formik
      initialValues={
        {
          ...initialDelegatingFormValues,
          stxAddress: currentAccountAddresses.address,
        } as EditingFormValues
      }
      onSubmit={handleStackStxSubmit}
      validationSchema={validationSchema}
    >
      <StartStackingLayout
        intro={<LiquidStackingIntro timeUntilNextCycle={getSecondsUntilNextCycleQuery.data} />}
        stackingInfoPanel={
          <StackingFormInfoPanel>
            <ProtocolInfoCard />
          </StackingFormInfoPanel>
        }
        stackingForm={
          <>
            <Form>
              <StackingFormContainer>
                <p>
                  Liquid Stacking, a new feature developed by Stacking DAO, gives users an
                  "auto-compounding tokenized representation of stacked STX (stSTX)" in exchange for
                  their STX. Unlike Stacking, there's no minimum STX requirement for participation,
                  and according to Stacking DAO, users can trade back to STX at any time. Learn more
                  about Stacking DAO by visiting their website and reading Stacking DAO’s docs.{' '}
                  <br /> <br />
                  <span className="mt-4">
                    Important: Leather allows users to integrate with Stacking DAO's liquid
                    stacking feature, but does not manage or have any control over the liquid
                    stacking process.
                  </span>
                </p>
                <ChooseStackingProtocol
                  onProtocolChange={() => {
                    /* do nothing */
                  }}
                />
                <ChooseStackingAmount />
                <ConfirmAndSubmit
                  isLoading={isContractCallExtensionPageOpen}
                  allowContractCallerTxId={''}
                  requiresAllowContractCaller={false}
                />
              </StackingFormContainer>
            </Form>
          </>
        }
      />
    </Formik>
  );
}
