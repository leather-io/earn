import { AccountExtendedBalances, StackingClient } from '@stacks/stacking';
import { validateStacksAddress } from '@stacks/transactions';
import { Box, Input, Stack } from '@stacks/ui';
import BigNumber from 'bignumber.js';
import { useField } from 'formik';
import { getDelegationStatus } from 'src/pages/stacking/pooled-stacking-info/get-delegation-status';

import { useAuth } from '@components/auth-provider/auth-provider';
import { useBlockchainApiClient } from '@components/blockchain-api-client-provider';
import { ErrorLabel } from '@components/error-label';
import { ErrorText } from '@components/error-text';
import { useNetwork } from '@components/network-provider';

import { Description, Step } from '../../../components/stacking-form-step';

export function Stacker() {
  const { accountsApi, transactionsApi, smartContractsApi } = useBlockchainApiClient();
  const { network } = useNetwork();
  const { address } = useAuth();

  const [field, meta] = useField('stacker');
  const [, , amountHelpers] = useField('amount');

  const updateAvailableLockingAmount = async (stacker: string) => {
    if (validateStacksAddress(stacker) && stacker) {
      const stackingClient = new StackingClient(stacker, network);
      const [delegationStatus, extendedBalances] = await Promise.all([
        getDelegationStatus({
          stackingClient,
          accountsApi,
          transactionsApi,
          smartContractsApi,
          address: stacker,
        }),
        stackingClient.getAccountExtendedBalances(),
      ]);

      if (!delegationStatus.isDelegating || delegationStatus.delegatedTo !== address) {
        return;
      }

      const availableAmountForLockingInSTX = getAvailableAmountForLockingInSTX(
        delegationStatus.amountMicroStx,
        extendedBalances
      );
      amountHelpers.setValue(availableAmountForLockingInSTX);
    }
  };

  return (
    <Step title="Stacker">
      <Description>
        <Stack alignItems="flex-start" spacing="base">
          The stacks address of your pool member.
        </Stack>
      </Description>

      <Box position="relative" maxWidth="400px">
        <Input
          id="stacker"
          placeholder="Stacks address"
          mt="loose"
          {...field}
          onChange={e => {
            updateAvailableLockingAmount((e.target as HTMLInputElement).value);
            field.onChange(e);
          }}
        />
        {meta.touched && meta.error && (
          <ErrorLabel>
            <ErrorText>{meta.error}</ErrorText>
          </ErrorLabel>
        )}
      </Box>
    </Step>
  );
}

export function getAvailableAmountForLockingInSTX(
  amountMicroStx: bigint,
  extendedBalances: AccountExtendedBalances
) {
  return BigNumber.min(amountMicroStx.toString(), extendedBalances.stx.balance.toString())
    .dividedToIntegerBy(1_000_000)
    .toString();
}
