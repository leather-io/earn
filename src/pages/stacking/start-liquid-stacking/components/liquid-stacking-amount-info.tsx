import { Flex, Text } from '@stacks/ui';

interface LiquidStackingAmountInfoProps {
  title: string;
  amountText: string;
}
export function LiquidStackingAmountInfo({ title, amountText }: LiquidStackingAmountInfoProps) {
  return (
    <Flex flexDirection="column" pt="extra-loose" pb="base-loose">
      <Text textStyle="body.large.medium">{title}</Text>
      <Text
        fontSize="24px"
        fontFamily="Diatype"
        fontWeight={500}
        letterSpacing="-0.02em"
        mt="extra-tight"
      >
        {amountText}
      </Text>
    </Flex>
  );
}
