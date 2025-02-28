import { IconInfoCircle } from '@tabler/icons-react';
import { Flex, Stack, styled } from 'leather-styles/jsx';

import { Alert } from '@components/alert';
import { InfoCard } from '@components/info-card';
import { Link } from '@components/link';

export function NoPooling() {
  return (
    <Flex height="100%" justify="center" align="center" m="loose">
      <InfoCard p="extra-loose" width={['360px', '360px', '360px', '420px']}>
        <Alert icon={<IconInfoCircle />}>
          <Stack>
            <styled.p>
              It appears that you&apos;re not pooling yet. If you recently started to pool, your
              pooling info will appear here in a few seconds.
            </styled.p>
            <styled.p>
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
            </styled.p>
          </Stack>
        </Alert>
      </InfoCard>
    </Flex>
  );
}
