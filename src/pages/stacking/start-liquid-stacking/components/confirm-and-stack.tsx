import { useState } from 'react';

import { Action, Step } from '../../components/stacking-form-step';
import { StackingUserConfirm } from '../../components/stacking-user-confirm';
import { LiquidStackingTerms } from './liquid-stacking-terms';

interface ConfirmAndSubmitProps {
  isLoading: boolean;
}
export function ConfirmAndSubmit({ isLoading }: ConfirmAndSubmitProps) {
  const [hasUserConfirmed, setHasUserConfirmed] = useState(false);

  return (
    <Step title="Confirm and stack">
      <LiquidStackingTerms mt="loose" />
      <StackingUserConfirm onChange={useConfirmed => setHasUserConfirmed(useConfirmed)} />

      <Action type="submit" isLoading={isLoading} isDisabled={!hasUserConfirmed}>
        Confirm and start liquid stacking
      </Action>
    </Step>
  );
}
