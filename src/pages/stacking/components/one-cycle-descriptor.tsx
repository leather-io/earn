import { FC } from 'react';

import { Spinner } from '@leather.io/ui';
import { BoxProps, styled } from 'leather-styles/jsx';

import { ErrorAlert } from '@components/error-alert';
import { useGetPoxInfoQuery } from '@components/stacking-client-provider/stacking-client-provider';

export const OneCycleDescriptor: FC<BoxProps> = props => {
  const q = useGetPoxInfoQuery();

  if (q.isLoading) {
    return <Spinner />;
  }

  if (q.isError || !q.data) {
    const id = 'd447780e-7df2-4953-b409-aef9e91cf2e8';
    const msg = 'Failed to retrieve necessary data.';
    // TODO: log error
    console.error(id, msg);
    return <ErrorAlert id={id}>{msg}</ErrorAlert>;
  }

  return (
    <styled.p display="block" textStyle="body.small" color="ink.text-subdued" {...props}>
      Cycles last {q.data.reward_cycle_length} Bitcoin blocks.
    </styled.p>
  );
};
