import { Button } from '@leather.io/ui';
import { Box, Flex, Stack, styled } from 'leather-styles/jsx';

import { InfoCard } from '@components/info-card';

interface IncreasePoolingAmountProps {
  handleKeepPoolingClick: () => void;
  handleStopPoolingClick: () => void;
  handleDelegateAgainClick: () => void;
  isSelfService: boolean;
}
export function IncreasePoolingAmount({
  handleKeepPoolingClick,
  handleStopPoolingClick,
  handleDelegateAgainClick,
  isSelfService,
}: IncreasePoolingAmountProps) {
  return (
    <InfoCard>
      <Box mx={['space.03', 'space.04']}>
        <Flex flexDirection="column" pt="space.03" pb="space.02">
          <styled.p>Increase pooling amount</styled.p>
          {isSelfService ? (
            <>
              <styled.p py="space.03">
                To increase the amount of STX you can just delegate a higher amount for the next
                cycle.
              </styled.p>
              <Stack>
                <Button variant="outline" onClick={handleKeepPoolingClick}>
                  Keep same amount
                </Button>
                <Button variant="outline" onClick={handleDelegateAgainClick}>
                  Delegate again
                </Button>
              </Stack>
            </>
          ) : (
            <>
              <styled.p py="space.03">
                To increase the amount of STX you must first stop the current pool and start pooling
                again, your pool operator can then lock a higher amount for the next cycles.
              </styled.p>
              <Stack>
                <Button variant="outline" onClick={handleKeepPoolingClick}>
                  Keep pooling
                </Button>
                <Button variant="outline" onClick={handleStopPoolingClick}>
                  I understand I want to stop pooling
                </Button>
              </Stack>
            </>
          )}{' '}
        </Flex>
      </Box>
    </InfoCard>
  );
}
