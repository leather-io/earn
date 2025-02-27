import { useState } from 'react';

import { Form, Formik } from 'formik';
import { styled } from 'leather-styles/jsx';

import { useAuth } from '@components/auth-provider/auth-provider';
import { CenteredErrorAlert } from '@components/centered-error-alert';
import { CenteredSpinner } from '@components/centered-spinner';
import {
  useGetAccountBalanceLockedQuery,
  useGetPoxInfoQuery,
  useGetStatusQuery,
  useStackingClient,
} from '@components/stacking-client-provider/stacking-client-provider';
import { useNavigate } from '@hooks/use-navigate';
import { useStacksNetwork } from '@hooks/use-stacks-network';

import { useDelegationStatusQuery } from '../pooled-stacking-info/use-delegation-status-query';
import { PoxContractName } from '../start-pooled-stacking/types-preset-pools';
import { getPoxContracts } from '../start-pooled-stacking/utils-preset-pools';
import { SelfServiceLayout } from './components/self-service-extend-layout';
import { createHandleSubmit, createValidationSchema } from './utils';

export function SelfServiceExtend() {
  const navigate = useNavigate();
  const getStatusQuery = useGetStatusQuery();
  const getDelegationStatusQuery = useDelegationStatusQuery();
  const getAccountBalanceLockedQuery = useGetAccountBalanceLockedQuery();
  const getPoxInfoQuery = useGetPoxInfoQuery();

  const { client } = useStackingClient();
  const { address: stacker } = useAuth();
  const { network, networkName } = useStacksNetwork();

  const [isContractCallExtensionPageOpen, setIsContractCallExtensionPageOpen] = useState(false);

  if (
    getStatusQuery.isLoading ||
    getDelegationStatusQuery.isLoading ||
    getAccountBalanceLockedQuery.isLoading ||
    getPoxInfoQuery.isLoading
  ) {
    return <CenteredSpinner />;
  }

  if (stacker === null) {
    return (
      <CenteredErrorAlert>
        <styled.p> Authentication required</styled.p>
      </CenteredErrorAlert>
    );
  }

  if (
    getStatusQuery.isError ||
    !getStatusQuery.data ||
    getAccountBalanceLockedQuery.isError ||
    typeof getAccountBalanceLockedQuery.data !== 'bigint' ||
    getPoxInfoQuery.isError ||
    !getPoxInfoQuery.data ||
    getDelegationStatusQuery.isError ||
    !getDelegationStatusQuery.data ||
    !client
  ) {
    const msg = 'Error while loading data, try reloading the page.';
    console.error(msg);
    return (
      <CenteredErrorAlert id="0abc083b-06c7-4795-8491-68264595f1b4">
        <styled.p>{msg}</styled.p>
      </CenteredErrorAlert>
    );
  }

  const stackerInfoDetails = getStatusQuery.data?.stacked
    ? getStatusQuery.data?.details
    : undefined;
  const delegationDetails = getDelegationStatusQuery.data?.delegated
    ? getDelegationStatusQuery.data?.details
    : undefined;
  const poxContracts = getPoxContracts(network);

  let delegatedTo: PoxContractName | undefined;
  switch (delegationDetails?.delegated_to) {
    case poxContracts[PoxContractName.WrapperFastPool]:
      delegatedTo = PoxContractName.WrapperFastPool;
      break;
    case poxContracts[PoxContractName.WrapperRestake]:
      delegatedTo = PoxContractName.WrapperRestake;
      break;
    default:
      delegatedTo = undefined;
  }

  if (delegatedTo === undefined) {
    return (
      <CenteredErrorAlert id="0abc083b-06c7-4795-8491-68264595f1b4">
        <styled.p>Not pooling with a self-service pool</styled.p>
      </CenteredErrorAlert>
    );
  }

  const validationSchema = createValidationSchema({ networkName });
  const handleSubmit = createHandleSubmit({
    navigate,
    setIsContractCallExtensionPageOpen,
    delegatedTo,
    network,
  });
  return (
    <Formik
      initialValues={{ stacker: stacker || '' }}
      onSubmit={handleSubmit}
      validationSchema={validationSchema}
    >
      <Form>
        <SelfServiceLayout
          currentUser={stacker}
          stackerInfoDetails={stackerInfoDetails}
          lockedBalance={getAccountBalanceLockedQuery.data}
          poxInfo={getPoxInfoQuery.data}
          isContractCallExtensionPageOpen={isContractCallExtensionPageOpen}
        />
      </Form>
    </Formik>
  );
}
