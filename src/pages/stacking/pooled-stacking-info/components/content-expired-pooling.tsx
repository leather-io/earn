import { Button } from '@leather.io/ui';
import { Box, styled } from 'leather-styles/jsx';

interface ExpiredPoolingContentProps {
  isContractCallExtensionPageOpen: boolean;
  handleStopPoolingClick: () => void;
}
export function ExpiredPoolingContent({
  isContractCallExtensionPageOpen,
  handleStopPoolingClick,
}: ExpiredPoolingContentProps) {
  return (
    <>
      <styled.h2 textStyle="heading.02">You&apos;ve finished pooling</styled.h2>
      <styled.p pb="space.02">
        Revoke the pool&apos;s permission to stack on your behalf to start stacking again.
      </styled.p>
      <Box>
        <Button
          disabled={isContractCallExtensionPageOpen}
          onClick={() => {
            handleStopPoolingClick();
          }}
        >
          Revoke permission
        </Button>
      </Box>
    </>
  );
}
