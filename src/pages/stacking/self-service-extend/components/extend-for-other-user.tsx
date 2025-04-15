import { useState } from 'react';

import { Button, Input } from '@leather.io/ui';
import { StackingClient } from '@stacks/stacking';
import { IconLock } from '@tabler/icons-react';
import { useField } from 'formik';
import { Box, styled } from 'leather-styles/jsx';

import { CenteredSpinner } from '@components/centered-spinner';
import { ErrorLabel } from '@components/error-label';
import { ErrorText } from '@components/error-text';
import { InfoCardRow as Row } from '@components/info-card';
import { fetchFn } from '@components/stacking-client-provider/fetch-fn';
import {
  useGetPoxInfoQuery,
  useGetStatusWithClientQuery,
} from '@components/stacking-client-provider/stacking-client-provider';
import { useStacksNetwork } from '@hooks/use-stacks-network';

import { useDelegationStatusForUserQuery } from '../../pooled-stacking-info/use-delegation-status-query';
import { isAtEndOfStackingPeriod } from '../utils';
import { StackerDetailsRowsForUserExtend } from './stacker-details-rows-for-extend';

interface Props {
  onClose: () => void;
  isContractCallExtensionPageOpen: boolean;
}
export function ExtendForOtherUser({ onClose, isContractCallExtensionPageOpen }: Props) {
  const [showPreview, setShowPreview] = useState(false);
  const [field, meta] = useField('stacker');
  const { network } = useStacksNetwork();
  const address = field.value;
  const client = new StackingClient({ address, network, client: { fetch: fetchFn } });
  const getStatusQuery = useGetStatusWithClientQuery(client);
  const getPoxInfoQuery = useGetPoxInfoQuery();
  const getDelegationStatusQuery = useDelegationStatusForUserQuery({ client, address, network });
  if (
    getPoxInfoQuery.isError ||
    !getPoxInfoQuery.data ||
    getDelegationStatusQuery.isError ||
    !getDelegationStatusQuery.data ||
    getStatusQuery.isError ||
    !getStatusQuery.data
  ) {
    return <CenteredSpinner />;
  }

  const stackerInfoDetails = getStatusQuery.data.stacked ? getStatusQuery.data.details : undefined;
  const requiresExtension = stackerInfoDetails
    ? isAtEndOfStackingPeriod(stackerInfoDetails, getPoxInfoQuery.data)
    : true;
  const delegationStatus = getDelegationStatusQuery.data;
  return (
    <>
      {showPreview ? (
        <StackerDetailsRowsForUserExtend
          address={address}
          stackerInfoDetails={stackerInfoDetails}
          delegationStatus={delegationStatus}
          requiresExtension={requiresExtension}
        />
      ) : (
        <styled.p>
          Enter the Stacks address of a pool member to lock their delegated STX for 1 more cycle.
        </styled.p>
      )}

      <Box position="relative" maxWidth="400px" mt="space.05">
        <Input.Root>
          <Input.Label>Stacks address</Input.Label>
          <Input.Field id="stacker" disabled={showPreview} autoComplete="off" {...field} />
        </Input.Root>
        {meta.touched && meta.error && (
          <ErrorLabel>
            <ErrorText>{meta.error}</ErrorText>
          </ErrorLabel>
        )}
      </Box>

      <Row m="loose" justifyContent="space-between">
        <Button onClick={onClose}>Cancel</Button>
        {showPreview ? (
          <Button
            type="submit"
            aria-busy={isContractCallExtensionPageOpen}
            disabled={!requiresExtension || !delegationStatus.delegated}
          >
            <Box mr="space.05">
              <IconLock />
            </Box>
            Lock STX
          </Button>
        ) : (
          <Button
            onClick={e => {
              e.preventDefault();
              setShowPreview(true);
            }}
          >
            Preview
          </Button>
        )}
      </Row>
    </>
  );
}
