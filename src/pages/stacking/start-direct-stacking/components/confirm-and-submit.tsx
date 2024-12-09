import { useState } from 'react';

import { Box } from 'leather-styles/jsx';

import { StackingDisclaimer } from '@components/stacking-disclaimer';

import { Action, Step } from '../../components/stacking-form-step';
import { StackingUserConfirm } from '../../components/stacking-user-confirm';
import { DirectStackingTerms } from './direct-stacking-terms';

interface ConfirmAndSubmitProps {
  isLoading: boolean;
}

export function ConfirmAndSubmit({ isLoading }: ConfirmAndSubmitProps) {
  const [hasUserConfirmed, setHasUserConfirmed] = useState(false);

  return (
    <Step title="Confirm and stack">
      <DirectStackingTerms mt="loose" />
      <StackingUserConfirm
        onChange={useConfirmed => setHasUserConfirmed(useConfirmed)}
        mt="extra-loose"
      />
      <Action type="submit" isLoading={isLoading} isDisabled={!hasUserConfirmed}>
        Confirm and start stacking
      </Action>
      <Box mt="space.05">
        <StackingDisclaimer />
      </Box>
    </Step>
  );
}
