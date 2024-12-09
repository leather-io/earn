import { FC } from 'react';

import { Flex, styled } from 'leather-styles/jsx';
import { token } from 'leather-styles/tokens';

interface PoolingAmountInfoProps {
  title: string;
  amountText: string;
}
export const PoolingAmountInfo: FC<PoolingAmountInfoProps> = ({
  title,
  amountText,
}: PoolingAmountInfoProps) => {
  return (
    <Flex flexDirection="column" pb="space.03">
      <styled.p textStyle="body.large.medium" color="ink.text-subdued">
        {title}
      </styled.p>
      <styled.h4
        textStyle="heading.04"
        mt="extra-tight"
        color="ink.text-primary"
      >
        {amountText}
      </styled.h4>
    </Flex>
  );
};
