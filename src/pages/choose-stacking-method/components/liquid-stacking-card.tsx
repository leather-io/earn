import { Box, Flex } from '@stacks/ui';
import { IconLock, IconStairs } from '@tabler/icons-react';

import divingBoardIllustration from '@assets/images/stack-in-a-pool.svg';
import { Users } from '@components/icons/users';

import {
  StackingOptionCard as Card,
  StackingOptionsCardDescription as Description,
  StackingOptionCardBenefit as OptionBenefit,
  StackingOptionCardBenefitContainer as OptionBenefitContainer,
  StackingOptionCardTitle as Title,
} from '../components/start-stacking-layout';
import { ChooseStackingMethodLayoutProps } from '../types';
import { LiquidStackingButton } from './liquid-stacking-button';
import { PooledStackingInsufficientStackingBalanceWarning } from './pooled-stacking-insufficient-stacking-balance-warning';

export function LiquidStackingCard(props: ChooseStackingMethodLayoutProps) {
  return (
    <Card>
      <Box height="130px">
        <img
          src={divingBoardIllustration}
          width="150px"
          alt="Diving board illustration with a blue gradient and ominous-looking hole by Eugenia Digon"
        />
      </Box>
      <Title>Liquid Stacking</Title>
      <Description>
        Stack with a liquid stacking protocol, enabling you to retain your liquidity in stSTX tokens
        and auto-compound yield in STX. The provider may charge a small commission on rewards.
      </Description>

      <OptionBenefitContainer>
        <OptionBenefit icon={IconLock}>Interact with liquid stacking contracts</OptionBenefit>
        <OptionBenefit icon={Users}>A protocol stacks on your behalf</OptionBenefit>
        <OptionBenefit icon={IconStairs}>No minimum required</OptionBenefit>
      </OptionBenefitContainer>

      <Flex alignItems="center">
        <LiquidStackingButton {...props} />
        <PooledStackingInsufficientStackingBalanceWarning {...props} />
      </Flex>
    </Card>
  );
}
