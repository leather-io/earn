import { ErrorCircleIcon } from '@leather.io/ui';
import { Flex } from 'leather-styles/jsx';
import { token } from 'leather-styles/tokens';

export function Banner() {
  return (
    <Flex
      color={token('colors.ink.text-primary')}
      backgroundColor={'#D9CFC4'}
      fontSize="13px"
      textAlign="left"
      alignItems="center"
      textStyle="body.03"
      height="80px"
      px="24px"
      py="8px"
    >
      <ErrorCircleIcon style={{ marginRight: '8px' }} />
      This website provides the interface to connect with the Stacking protocol or delegate to a
      Stacking pool provider directly. We don&apos;t provide the Stacking service ourselves.
    </Flex>
  );
}
