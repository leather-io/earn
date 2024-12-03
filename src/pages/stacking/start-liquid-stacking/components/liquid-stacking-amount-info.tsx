import { Flex, styled } from 'leather-styles/jsx';

interface LiquidStackingAmountInfoProps {
  title: string;
  amountText: string;
}
export function LiquidStackingAmountInfo({ title, amountText }: LiquidStackingAmountInfoProps) {
  return (
    <Flex flexDirection="column" pt="space.03" pb="space.02">
      <styled.h3 textStyle="heading.03">{title}</styled.h3>
      <styled.h4 textStyle="heading.04" mt="space.01">
        {amountText}
      </styled.h4>
    </Flex>
  );
}
