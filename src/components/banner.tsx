import { ErrorCircleIcon } from '@leather.io/ui';
import { css } from 'leather-styles/css';
import { Box, Flex, styled } from 'leather-styles/jsx';

export function Banner() {
  return (
    <Flex
      flexDirection="row"
      alignItems="center"
      justifyContent="center"
      backgroundColor="#D9CFC4"
    >
      <Flex
        color="ink.text-primary"
        width="100%"
        maxWidth="1400px"
        paddingY="space.03"
        className={css({ width: { smToXl: '94%' }, height: 'auto' })}
      >
        <ErrorCircleIcon className={css({ minWidth: '14px', height: '14px' })} />
        <styled.p textStyle="label.03" display="flex" marginLeft="space.01">
          This website provides the interface to connect with the Stacking protocol or delegate to
          a Stacking pool provider directly. We don&apos;t provide the Stacking service ourselves.
        </styled.p>
      </Flex>
    </Flex>
  );
}
