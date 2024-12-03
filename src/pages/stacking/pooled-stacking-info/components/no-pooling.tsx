import { Flex, Stack, Text } from '@stacks/ui';
import { IconInfoCircle } from '@tabler/icons-react';

import { Alert } from '@components/alert';
import { InfoCard } from '@components/info-card';
import { Link } from '@components/link';

export function NoPooling() {
  return (
    <Flex height="100%" justify="center" align="center" m="loose">
      <InfoCard p="extra-loose" width={['360px', '360px', '360px', '420px']}>
        <Alert icon={<IconInfoCircle />}>
          <Stack>
            <Text>
              It appears that you&apos;re not pooling yet. If you recently started to pool, your
              pooling info will appear here in a few seconds.
            </Text>
            <Text>
              You may want to{' '}
              <Link
                display="inline"
                to="../start-pooled-stacking"
                color="ink.text-primary"
                textDecoration="underline"
              >
                start pooling
              </Link>{' '}
              or{' '}
              <Link
                display="inline"
                to="../choose-stacking-method"
                color="ink.text-primary"
                textDecoration="underline"
              >
                choose your stacking method
              </Link>
              .
            </Text>
          </Stack>
        </Alert>
      </InfoCard>
    </Flex>
  );
}
