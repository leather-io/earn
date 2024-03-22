import { FC } from 'react';

import { Flex, Text, color } from '@stacks/ui';

interface PoolingAmountInfoProps {
  title: string;
  amountText: string;
}
export const PoolingAmountInfo: FC<PoolingAmountInfoProps> = ({
  title,
  amountText,
}: PoolingAmountInfoProps) => {
  return (
    <Flex flexDirection="column" pt="extra-loose" pb="base-loose">
      <Text textStyle="body.large.medium" color={color('text-caption')}>
        {title}
      </Text>
      <Text
        fontSize="24px"
        fontFamily="Open Sauce"
        fontWeight={500}
        letterSpacing="-0.02em"
        mt="extra-tight"
        color={color('text-caption')}
      >
        {amountText}
      </Text>
    </Flex>
  );
};
