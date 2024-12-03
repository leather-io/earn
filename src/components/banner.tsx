import { ErrorCircleIcon } from '@leather.io/ui';
import { css } from 'leather-styles/css';
import { Box, Flex, styled } from 'leather-styles/jsx';

export function Banner() {
  return (
    <Box
      className={css({
        width: '100%',
        backgroundColor: '#D9CFC4',
      })}
    >
      <Flex
        color="ink.text-primary"
        alignItems="center"
        justifyContent="center"
        className={css({ width: { base: '84%', mdDown: '90%' }, height: '80px' })}
      >
        <Flex
          alignItems="center"
          justifyContent="space-between"
          maxWidth="1240px"
          className={css({ marginLeft: { lgDown: 'space.04' } })}
        >
          <ErrorCircleIcon className={css({ minWidth: '14px', height: '14px' })} />
          <styled.p textStyle="body.02" display="flex" alignItems="center">
            This website provides the interface to connect with the Stacking protocol or delegate to
            a Stacking pool provider directly. We don&apos;t provide the Stacking service ourselves.
          </styled.p>
        </Flex>
      </Flex>
    </Box>
  );
}
