import { PoolName } from "./types-preset-pools";

interface DelegationFormValues<N> {
  amount: N;
  rewardAddress: string;
  poolAddress: string;
  poolName: PoolName;
}
interface DelegatingFormIndefiniteValues<N> extends DelegationFormValues<N> {
  delegationDurationType: "indefinite";
}
interface DelegatingFormLimitedValues<N> extends DelegationFormValues<N> {
  delegationDurationType: "limited";
  numberOfCycles: number;
}

type AbstractDelegatingFormValues<N> =
  | DelegatingFormIndefiniteValues<N>
  | DelegatingFormLimitedValues<N>;

export type EditingFormValues = AbstractDelegatingFormValues<string | number>;
