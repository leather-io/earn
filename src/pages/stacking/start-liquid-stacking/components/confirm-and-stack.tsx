import { useState } from 'react';

import { Action, Step } from '../../components/stacking-form-step';
import { StackingUserConfirm } from '../../components/stacking-user-confirm';
import { LiquidStackingTerms } from './liquid-stacking-terms';

interface ConfirmAndSubmitProps {
  isLoading: boolean;
  requiresAllowContractCaller: boolean;
  allowContractCallerTxId: string | undefined;
}
export function ConfirmAndSubmit({
  isLoading,
  requiresAllowContractCaller,
  allowContractCallerTxId,
}: ConfirmAndSubmitProps) {
  const [hasUserConfirmed, setHasUserConfirmed] = useState(false);

  return (
    <Step title="Confirm and stack">
      <LiquidStackingTerms mt="loose" />
      <StackingUserConfirm onChange={useConfirmed => setHasUserConfirmed(useConfirmed)} />

      <Action
        type="submit"
        isLoading={isLoading}
        isDisabled={!hasUserConfirmed || (requiresAllowContractCaller && !allowContractCallerTxId)}
      >
        Confirm and start liquid stacking
      </Action>
    </Step>
  );
}
