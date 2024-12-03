import { Box, Flex } from 'leather-styles/jsx';

import { Screen } from '@components/screen';

type Slots = 'intro' | 'stackingInfoPanel' | 'stackingForm';

type StartStackingLayoutProps = Record<Slots, JSX.Element>;

export function StartStackingLayout(props: StartStackingLayoutProps) {
  const { intro, stackingInfoPanel, stackingForm } = props;
  return (
    <Screen pt="space.05" mb="space.05">
      <Flex
        flexDirection={['column-reverse', 'column-reverse', 'row']}
        justifyContent="space-between"
      >
        <Box maxWidth={[null, null, '544px']} mr={[null, null, 'space.05']}>
          {intro}
          <Box display={['block', null, 'none']} mt={['space.05', null, null, null, 'space.04']}>
            {stackingInfoPanel}
          </Box>
          {stackingForm}
        </Box>
        <Box display={['none', null, 'block']}>{stackingInfoPanel}</Box>
      </Flex>
    </Screen>
  );
}
