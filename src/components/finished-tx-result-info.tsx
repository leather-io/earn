import { FinishedTxData } from '@stacks/connect';
import { Box } from 'leather-styles/jsx';

import { Alert, AlertText } from './alert';

interface FinishedTxResultInfoProps {
  txResult: FinishedTxData;
}

export function FinishedTxResultInfo({ txResult }: FinishedTxResultInfoProps) {
  return (
    <Box my="loose">
      <Alert title="Last tx result">
        <AlertText>{txResult.txId}</AlertText>
      </Alert>
    </Box>
  );
}
