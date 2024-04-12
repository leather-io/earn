import * as yup from 'yup';

import { createBtcAddressSchema } from '@utils/validators/btc-address-validator';

import { MAX_U128_BIGNUMBER_STX } from './types';
import { parseNumber } from '@utils/unit-convert';

export function createValidationSchema({
  network,
  currentCycle,
}: {
  network: string;
  currentCycle: number;
}) {
  return yup.object().shape({
    topic: yup
      .string()
      .oneOf(
        ['stack-extend', 'agg-commit', 'stack-stx', 'stack-increase', 'agg-increase'],
        'Invalid topic'
      ),
    poxAddress: createBtcAddressSchema({
      network,
    }),
    period: yup
      .number()
      .defined()
      .test({
        name: 'is-1-if-agg-commit',
        message: 'Period must be 1 for pooled Stacking functions',
        test: (value, context) => {
          const { topic } = context.parent;
          if (topic === 'agg-commit' || topic === 'agg-increase') {
            return value === 1;
          }
          return true;
        },
      }),
    rewardCycleId: yup
      .number()
      .required('Reward cycle is required')
      .test(
        'is-in-future',
        'Reward cycle must be in the future for pool functions',
        function (rewardCycle) {
          const topic = this.parent.topic;
          if (topic === 'agg-commit' || topic === 'agg-increase') {
            return rewardCycle > currentCycle;
          }
          return true;
        }
      ),
    authId: yup
      .number()
      .required('Auth ID is required')
      .positive('Auth ID must be a positive integer')
      .test('is-int', 'Auth ID must be an integer', value => {
        if (typeof value === 'undefined') return false;
        return Number.isInteger(value);
      }),
    maxAmount: yup
      .string()
      .required('Max amount is required')
      // .positive('Max amount must be a positive integer')
      // .test('is-int', 'Amount must be an integer', value => {
      //   if (typeof value === 'undefined') return false;
      //   return Number.isInteger(value);
      // })
      .test('is-u128', 'Amount too high', value => {
        try {
          if (typeof value === 'undefined') return false;
          return MAX_U128_BIGNUMBER_STX.gte(parseNumber(value));
          // return parseNumber(MAX_U128).lte(parseNumber(value));
        } catch (error) {
          return false;
        }
      }),
    // .test('test-precision', 'You cannot stack with a precision of less than 1 STX', value => {
    //   // If `undefined`, throws `required` error
    //   if (value === undefined) return true;
    //   return validateDecimalPrecision(0)(value);
    // }),
  });
}
