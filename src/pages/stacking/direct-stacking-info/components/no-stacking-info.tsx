import { IconInfoCircle } from '@tabler/icons-react';
import { Flex, Stack, styled } from 'leather-styles/jsx';

import { Alert } from '@components/alert';
import { InfoCard } from '@components/info-card';
import { Link } from '@components/link';

export function NoStackingInfo() {
  return (
    <Flex height="100%" justify="center" align="center" m="loose">
      <InfoCard width="420px">
        <Alert icon={<IconInfoCircle />}>
          <Stack>
            <styled.p>
              It appears that you&apos;re not stacking yet. If you recently started to stack, your
              stacking info will appear here in a few seconds.
            </styled.p>
            <styled.p>
              You may want to{' '}
              <Link
                to="../start-direct-stacking"
                color="ink.text-primary"
                textDecoration="underline"
              >
                start stacking
              </Link>{' '}
              or{' '}
              <Link
                to="../choose-stacking-method"
                color="ink.text-primary"
                textDecoration="underline"
              >
                choose your stacking method
              </Link>
              .
            </styled.p>
          </Stack>
        </Alert>
      </InfoCard>
    </Flex>
  );
}
