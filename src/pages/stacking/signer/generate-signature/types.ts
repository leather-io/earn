import BigNumber from 'bignumber.js';
import * as yup from 'yup';

import { microStxToStxBigint } from '@utils/unit-convert';

export type GenerateSignatureFields = {
  poxAddress: string;
  period: number;
  rewardCycleId: number;
  topic: string;
  maxAmount: string;
  authId: string;
};

const MAX_U128_BIGINT = 340282366920938463463374607431768211455n;
export const MAX_U128_BIGNUMBER_STX = new BigNumber(microStxToStxBigint(MAX_U128_BIGINT));
/** Max u128 value (in STX) */
export const MAX_U128 = microStxToStxBigint(MAX_U128_BIGINT);

export const SignatureDataSchema = yup.object().shape({
  signerKey: yup.string().required(),
  signerSignature: yup.string().required(),
  authId: yup.string().required(),
  rewardCycle: yup.string().required(),
  maxAmount: yup.string().required(),
  period: yup.string().required(),
  poxAddress: yup.string().required(),
  method: yup.string().required(),
});

export type SignatureJSON = yup.InferType<typeof SignatureDataSchema>;
