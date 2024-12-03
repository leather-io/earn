import { Title } from '@components/title';

import { NextCycleStartTime } from '../../components/next-cycle-start-time';

interface LiquidStackingIntroProps {
  /**
   * Time, in seconds, until the start of the next cycle.
   */
  timeUntilNextCycle: number;
}
export function LiquidStackingIntro({ timeUntilNextCycle }: LiquidStackingIntroProps) {
  return (
    <>
      <Title>Liquid Stacking</Title>
      <NextCycleStartTime mt="space.04" timeUntilNextCycle={timeUntilNextCycle} />
    </>
  );
}
