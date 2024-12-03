import { IconEdit } from '@tabler/icons-react';
import { Box, FlexProps, styled } from 'leather-styles/jsx';

import { InfoCardGroup as Group, InfoCard, InfoCardRow as Row } from '@components/info-card';
import { Link } from '@components/link';

export function StackingGuideInfoCard(props: FlexProps) {
  return (
    <>
      <InfoCard {...props}>
        <Group width="100%">
          <Box position="relative" top="-3px">
            <Row>
              <IconEdit />

              <Link to="">
                <styled.p
                  textStyle="body.02"
                  fontWeight={500}
                  display="block"
                  style={{ wordBreak: 'break-all' }}
                >
                  Read the Stacking Guide
                </styled.p>
                <styled.p
                  textStyle="body.02"
                  color="ink.text-subdued"
                  mt="tight"
                  display="inline-block"
                  lineHeight="18px"
                >
                  to get the most out of stacking.
                </styled.p>
              </Link>
            </Row>
          </Box>
        </Group>
      </InfoCard>
    </>
  );
}
