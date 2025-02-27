import { useFormikContext } from 'formik';
import { styled } from 'leather-styles/jsx';

import { Description, Step } from '../../components/stacking-form-step';
import { EditingFormValues } from '../types';
import { PayoutMethod } from '../types-preset-pools';
import { pools } from './preset-pools';

export function PresetPoolingRewardAddressInfo() {
  const f = useFormikContext<EditingFormValues>();

  const { poolName } = f.values;
  const payoutMethod = poolName ? pools[poolName].payoutMethod : PayoutMethod.OTHER;

  return (
    <Step title="Reward address">
      <Description>
        {payoutMethod === PayoutMethod.STX ? (
          <styled.p>
            The address where you&apos;ll receive your STX rewards is your current account.
          </styled.p>
        ) : (
          <styled.p>
            The address where you&apos;ll receive rewards is determined by the pool.
          </styled.p>
        )}
      </Description>
    </Step>
  );
}
