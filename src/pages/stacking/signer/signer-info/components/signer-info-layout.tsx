import { Screen } from '@components/screen';
import { Title } from '@components/title';
import { useNavigate } from '@hooks/use-navigate';
import { Box, Button, Flex } from '@stacks/ui';

export function SignerInfoLayout() {
  const navigate = useNavigate();
  return (
    <Screen pt="80px" mb="extra-loose">
      <Flex
        flexDirection={['column-reverse', 'column-reverse', 'row']}
        justifyContent="space-between"
      >
        <Box maxWidth={[null, null, '544px']} mr={[null, null, 'extra-loose']}>
          <Title>Signer Details</Title>
          As a signer, you contribute to the consensus of the Stacks blockchain.
          <Box mt={['extra-loose', null, null, null, 'base']}>
            Stackers can add their Stacked STX to your signing service. For that, you need to
            provide a signature for each stacker.
          </Box>
          <Button mt={'loose'} onClick={() => navigate('./generate-signature')}>
            Generate Signatures
          </Button>
        </Box>
      </Flex>
    </Screen>
  );
}
