import { ReactNode } from 'react';

import { token } from 'leather-styles/tokens';

import { ErrorAlert } from './error-alert';
import { InfoCard } from './info-card';

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
