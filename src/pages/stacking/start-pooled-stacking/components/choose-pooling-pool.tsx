import { useField } from 'formik';
import { Stack, styled } from 'leather-styles/jsx';

import { OpenExternalLinkInNewTab } from '@components/external-link';

import { Description, Step } from '../../components/stacking-form-step';
import { PoolName } from '../types-preset-pools';
import { PoolSelectItem } from './pool-select-item';
import { pools } from './preset-pools';

interface ChoosePoolingPoolProps {
  onPoolChange: (val: PoolName) => void;
}
export function ChoosePoolingPool({ onPoolChange }: ChoosePoolingPoolProps) {
  const [fieldPoolName, , helpersPoolName] = useField('poolName');
  const [, , helpersDelegationDurationType] = useField('delegationDurationType');
  const onChange = (poolName: PoolName) => {
    helpersDelegationDurationType.setValue(pools[poolName].duration > 0 ? 'indefinite' : 'limited');
    helpersPoolName.setValue(poolName);
    onPoolChange(poolName);
  };
  return (
    <Step title="Pool">
      <Description>
        <styled.p>
          Select a pool to start stacking or{' '}
          <OpenExternalLinkInNewTab display="inline" href="https://www.stacks.co/learn/stacking">
            discover others on stacks.co.
          </OpenExternalLinkInNewTab>
        </styled.p>
      </Description>

      <Stack gap="space.02" mt="extra-loose">
        {(Object.keys(pools) as PoolName[]).map((poolName: PoolName, index: number) => {
          const p = pools[poolName];
          if (p.disabled) return null;
          return (
            <PoolSelectItem
              name={p.name}
              icon={p.icon}
              description={p.description}
              url={p.website}
              key={index}
              activePoolName={fieldPoolName.value}
              onChange={onChange}
            />
          );
        })}
      </Stack>
    </Step>
  );
}
