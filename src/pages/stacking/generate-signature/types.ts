export type GenerateSignatureFields = {
  poxAddress: string;
  period: number;
  rewardCycleId: number;
  topic: string;
  maxAmount: string;
  authId: string;
};

/** Max u128 value (in STX) */
export const MAX_U128 = 340282366920938463463374607431768211455n / 1000000n;
