import { Spinner } from '@leather.io/ui';
import { Flex } from 'leather-styles/jsx';

export function CenteredSpinner() {
  return (
    <Flex justify="center" align="center" m="space.06" p="space.06  ">
      <Spinner />
    </Flex>
  );
}
