import { StacksNetwork } from '@stacks/network';

import { EditingFormValues, PoolWrapperAllowanceState } from './types';
import { HandleAllowContractCallerArgs } from './utils-allow-contract-caller';
import {
  getNetworkInstance,
  getPoxWrapperContract,
  requiresAllowContractCaller,
} from './utils-preset-pools';
import { analytics } from '@utils/analytics';

interface CreateHandleSubmitArgs {
  hasUserConfirmedPoolWrapperContract: PoolWrapperAllowanceState;
  setHasUserConfirmedPoolWrapperContract: React.Dispatch<
    React.SetStateAction<PoolWrapperAllowanceState>
  >;
  handleDelegateStxSubmit: (val: EditingFormValues, onFinish?: () => void) => Promise<void>;
  handleAllowContractCallerSubmit: ({
    poxWrapperContract,
    onFinish,
  }: HandleAllowContractCallerArgs) => Promise<void>;
  network: StacksNetwork;
}

export function createHandleSubmit({
  handleDelegateStxSubmit,
  handleAllowContractCallerSubmit,
  hasUserConfirmedPoolWrapperContract,
  setHasUserConfirmedPoolWrapperContract,
  network,
}: CreateHandleSubmitArgs) {
  return async function handleSubmit(values: EditingFormValues) {
    if (values.poolName && requiresAllowContractCaller(values.poolName)) {
      const poxWrapperContract = getPoxWrapperContract(values.poolName, network);
      const networkInstance = getNetworkInstance(network);

      analytics.untypedTrack('stacking_initiated', {
        pool_or_protocol_name: values.poolName,
        network: networkInstance,
        stacking_type: 'pooled',
      });

      const trackStackCompleted = () => {
        analytics.untypedTrack('stacking_completed', {
          pool_or_protocol_name: values.poolName,
          network: networkInstance,
          stacking_type: 'pooled',
        });
      };

      if (hasUserConfirmedPoolWrapperContract[networkInstance]?.[poxWrapperContract]) {
        handleDelegateStxSubmit(values, trackStackCompleted);
        return;
      } else {
        handleAllowContractCallerSubmit({
          poxWrapperContract,
          onFinish: () => {
            setHasUserConfirmedPoolWrapperContract({
              ...hasUserConfirmedPoolWrapperContract,
              [networkInstance]: {
                ...hasUserConfirmedPoolWrapperContract[networkInstance],
                [poxWrapperContract]: true,
              },
            });
            trackStackCompleted();
          },
        });
        return;
      }
    } else {
      handleDelegateStxSubmit(values);
      return;
    }
  };
}
