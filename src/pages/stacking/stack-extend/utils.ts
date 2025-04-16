import { NavigateFunction } from 'react-router-dom';

import { ContractCallRegularOptions, showContractCall } from '@stacks/connect';
import { StackingClient } from '@stacks/stacking';
import * as yup from 'yup';

import routes from '@constants/routes';
import { stxToMicroStxBigint } from '@utils/unit-convert';
import { createBtcAddressSchema } from '@utils/validators/btc-address-validator';

import { SignerDetailsFormValues } from '../pool-admin/stack-aggregation-commit/types';

export interface EditingFormValues extends SignerDetailsFormValues {
  extendCycles: number;
  poxAddress: string;
}

export function createValidationSchema({ network }: { network: string }) {
  return yup.object().shape({
    extendCycles: yup
      .number()
      .required('Enter a number of cycles')
      .positive("You can't add zero cycles")
      .test({
        name: 'test-max-lock-period',
        message: "You can't lock for more than 12 cycles.",
        test: value => value <= 12,
      }),
    poxAddress: createBtcAddressSchema({
      network,
    }),
  });
}

interface CreateHandleSubmitArgs {
  client: StackingClient;
  navigate: NavigateFunction;
  setIsContractCallExtensionPageOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export function createHandleSubmit({
  client,
  navigate,
  setIsContractCallExtensionPageOpen,
}: CreateHandleSubmitArgs) {
  return async ({
    extendCycles,
    poxAddress,
    signerKey,
    signerSignature,
    maxAmount: _maxAmount,
    authId,
  }: EditingFormValues) => {
    if (!client) return;
    const stackingContract = await client.getStackingContract();
    const maxAmount = stxToMicroStxBigint(_maxAmount);
    const stackExtendOptions = client.getStackExtendOptions({
      contract: stackingContract,
      extendCycles,
      poxAddress,
      signerKey,
      signerSignature,
      maxAmount,
      authId: parseInt(authId),
    });
    stackExtendOptions.client = undefined;
    setIsContractCallExtensionPageOpen(true);
    showContractCall({
      // Type coercion necessary because the `network` property returned by
      // `client.getStackingContract()` has a wider type than allowed by `showContractCall`. Despite
      // the wider type, the actual value of `network` is always of the type `StacksNetwork`
      // expected by `showContractCall`.
      //
      // See
      // https://github.com/hirosystems/stacks.js/blob/0e1f9f19dfa45788236c9e481f9a476d9948d86d/packages/stacking/src/index.ts#L1054
      ...(stackExtendOptions as ContractCallRegularOptions),
      onCancel() {
        setIsContractCallExtensionPageOpen(false);
      },
      onFinish() {
        setIsContractCallExtensionPageOpen(false);
        navigate(routes.DIRECT_STACKING_INFO);
      },
    });
  };
}
