import { ProtocolName } from './types-preset-protocols';

interface LiquidStackingFormValues<N> {
  amount: N;
  protocolAddress: string;
  stxAddress: string;
  rewardAddress: string;
  protocolName: ProtocolName | undefined;
}
export type EditingFormValues = LiquidStackingFormValues<string | number>;

export type PresetProtocol = {
  logoUrl: string;
  protocolAddress: string;
  description: string;
  website: string;
  duration: number;
  payoutMethod: 'BTC' | 'STX';
};
