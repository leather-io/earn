import { SignerDetailsFormValues } from '../pool-admin/stack-aggregation-commit/types';

export interface DirectStackingFormValues extends SignerDetailsFormValues {
  /**
   * The amount of STX to lock up. Note that this amount is expressed in STX, while the PoX contract uses uSTX,
   *
   * The amount is converted from STX to uSTX during form submission.
   */
  amount: string;

  /**
   * The PoX rewards address. The address where rewards are paid into,
   *
   * Must be of a supported address type,
   */
  poxAddress: string;

  /**
   * The number of cycles to lock up the funds for,
   */
  lockPeriod: number;
}
