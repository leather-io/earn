import { ReactNode } from 'react';

import { ErrorAlert } from './error-alert';
import { InfoCard } from './info-card';
import { token } from 'leather-styles/tokens';

interface Props {
  id?: string;
  children?: ReactNode;
}

export function CenteredErrorAlert({ id, children }: Props) {
  return (
    <InfoCard
      m="extra-loose"
      justify="center"
      align="center"
      bg={token('colors.red.background-primary')}
    >
      <ErrorAlert id={id}>{children}</ErrorAlert>
    </InfoCard>
  );
}
