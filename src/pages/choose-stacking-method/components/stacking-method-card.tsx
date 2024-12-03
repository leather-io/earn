import { Button } from '@leather.io/ui';
import { Box, Flex, styled } from 'leather-styles/jsx';

import {
  StackingOptionCard as Card,
  InsufficientStackingBalanceWarning,
  StackingOptionCardBenefit as OptionBenefit,
  StackingOptionCardBenefitContainer as OptionBenefitContainer,
} from '../components/start-stacking-layout';
import { ChooseStackingMethodLayoutProps } from '../types';

type Props = ChooseStackingMethodLayoutProps & {
  title: string;
  description: string;
  icon: React.ReactNode;
  benefits: {
    icon: React.FC;
    title: string;
  }[];
  onButtonPress: () => void;
  buttonDisabled: boolean;
  buttonText: string;
  hasSufficientBalance: boolean;
};
export function StackingMethodCard(props: Props) {
  return (
    <Card mt="space.02">
      <Box height="100px">{props.icon}</Box>
      <styled.h1 textStyle="heading.01" fontSize="32px" mt="base-loose" mb="space.03">
        {props.title}
      </styled.h1>

      <styled.p textStyle="body.01" marginTop="extra-loose" mb="space.08">
        {props.description}
      </styled.p>

      <OptionBenefitContainer>
        {props.benefits.map((benefit, index) => (
          <OptionBenefit key={index} icon={benefit.icon}>
            {benefit.title}
          </OptionBenefit>
        ))}
      </OptionBenefitContainer>

      <Flex my="space.06" flexDirection="column" alignItems="flex-start">
        <Button
          variant="outline"
          alignSelf="flex-start"
          fullWidth
          disabled={props.buttonDisabled}
          onClick={props.onButtonPress}
        >
          {props.buttonText}
        </Button>
        {!props.isSignedIn ? null : props.hasSufficientBalance ? null : (
          <InsufficientStackingBalanceWarning />
        )}
      </Flex>
    </Card>
  );
}
