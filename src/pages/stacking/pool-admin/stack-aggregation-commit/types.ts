export interface StackAggregationCommitFormValues {
  /**
   * The PoX rewards address. The address where rewards are paid into,
   * Must be of a supported address type
   */
  poxAddress: string;

  /**
   * The reward cycle id that should be finalized.
   */
  rewardCycleId: number;

  /**
   * The public key of the signer that the pool is using.
   * This must be empty for pox-3 and lower, this must be filled
   */
  signerKey?: string;

  /**
   * A signature from the signerKey.
   * This must be empty for pox-3 and lower, this must be filled
   */
  signerSignature?: string;
}
