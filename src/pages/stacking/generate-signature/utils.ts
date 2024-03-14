import * as yup from 'yup';

import { validateDecimalPrecision } from '@utils/form/validate-decimals';
import { createBtcAddressSchema } from '@utils/validators/btc-address-validator';

import { MAX_U128 } from './types';

export function createValidationSchema({ network }: { network: string }) {
  return yup.object().shape({
    topic: yup
      .string()
      .oneOf(['stack-extend', 'agg-commit', 'stack-stx', 'stack-increase'], 'Invalid topic'),
    poxAddress: createBtcAddressSchema({
      network,
    }),
    rewardCycleId: yup.number().required('Reward cycle is required'),
    authId: yup
      .number()
      .required('Auth ID is required')
      .positive('Auth ID must be a positive integer')
      .test('is-int', 'Auth ID must be an integer', value => {
        if (typeof value === 'undefined') return false;
        return Number.isInteger(value);
      }),
    maxAmount: yup
      .number()
      .required('Max amount is required')
      .positive('Max amount must be a positive integer')
      .test('is-int', 'Amount must be an integer', value => {
        if (typeof value === 'undefined') return false;
        return Number.isInteger(value);
      })
      .test('is-u128', 'Amount too high', value => {
        try {
          if (typeof value === 'undefined') return false;
          const n = BigInt(value);
          return n <= MAX_U128;
        } catch (error) {
          return false;
        }
      })
      .test('test-precision', 'You cannot stack with a precision of less than 1 STX', value => {
        // If `undefined`, throws `required` error
        if (value === undefined) return true;
        return validateDecimalPrecision(0)(value);
      }),
  });
}
