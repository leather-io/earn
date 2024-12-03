import { Box, Stack, styled } from 'leather-styles/jsx';
import { token } from 'leather-styles/tokens';

import BTCBall from '../../assets/images/btc-ball.svg';
import EarnWithStackingImage from '../../assets/images/earn-with-stacking.svg';
import { DirectStackingCard } from './components/direct-stacking-card';
import { LiquidStackingCard } from './components/liquid-stacking-card';
import { Messages } from './components/messages';
import { PooledStackingCard } from './components/pooled-stacking-card';
import {
  EarnBTCSectionContainer,
  StackingOptionsCardContainer,
  StartStackingLayout,
} from './components/start-stacking-layout';
import { ChooseStackingMethodLayoutProps } from './types';
import { css } from 'leather-styles/css';
import { SectionHero } from 'src/pages/choose-stacking-method/components/section-hero';
import EarnWithSBTCImage from '../../assets/images/earn-with-btc-image.svg';
import { BridgeToSBTCCard } from 'src/pages/choose-stacking-method/components/bridge-to-sbtc-card';
import { EnrollForSBTCRewardsCard } from 'src/pages/choose-stacking-method/components/enroll-for-sbtc-rewards';

export function ChooseStackingMethodLayout(props: ChooseStackingMethodLayoutProps) {
  return (
    <StartStackingLayout>
      <PageTitle />
      <Stack
        backgroundColor={token('colors.ink.background-overlay')}
        height="100%"
        gap="space.00"
        mb="space.11"
        justifyContent="center"
      >
        {props.isSignedIn && (
          <Box pt="base">
            <Messages {...props} />
          </Box>
        )}

        <EarnWithSBTCSection {...props} />
        <StackingSection {...props} />
      </Stack>
    </StartStackingLayout>
  );
}

const PageTitle = () => {
  return (
    <Box
      my="space.09"
      className={css({
        marginLeft: { mdToXl: 'space.09', smOnly: 'space.04' },
        fontSize: { base: '108px', smOnly: '96px' },
      })}
    >
      <styled.section position="relative">
        <styled.h1
          fontFamily={'MarcheSuperPro'}
          textTransform="uppercase"
          style={{ lineHeight: '0.8' }}
        >
          Earn bitcoin yield with Leather
          <styled.span
            className={css({
              position: 'absolute',
              display: { smOnly: 'none' },
              top: { smOnly: '130px', mdOnly: '120px', lg: '50px' },
              right: { smOnly: '120px', mdOnly: '320px' },
            })}
          >
            <BTCBall />
          </styled.span>
        </styled.h1>
      </styled.section>
      <styled.p my="space.04" textStyle="body.01" fontSize="21px">
        Earn Bitcoin yield by bridging BTC into sBTC or stacking your STX.
      </styled.p>
    </Box>
  );
};

const StackingSection = (props: ChooseStackingMethodLayoutProps) => {
  return (
    <>
      <SectionHero
        title="Earn with stacking"
        subtitle="By stacking, you temporarily lock up your tokens in order to provide valuable information to Stacks’ consensus mechanism. 
In return, you are eligible to receive rewards in the form of BTC"
        description="If you meet the protocol minimum, you can Stack your STX independently by directly interacting with the protocol. You also have the option to delegate your STX to a stacking pool provider."
        image={<EarnWithStackingImage />}
      />
      <StackingOptionsCardContainer>
        <PooledStackingCard {...props} />
        <LiquidStackingCard {...props} />
        <DirectStackingCard {...props} />
      </StackingOptionsCardContainer>
    </>
  );
};

const EarnWithSBTCSection = (props: ChooseStackingMethodLayoutProps) => {
  return (
    <Box my="space.09">
      <SectionHero
        title="Earn Rewards with BTC"
        subtitle="sBTC is a 1:1 Bitcoin-backed digital asset on Stacks, the leading Bitcoin Layer 2 solution. By bridging your BTC to sBTC, you unlock Bitcoin’s potential for DeFi, NFTs, and more, earning approximately 5% Bitcoin yield* while maintaining full liquidity and self-custody. Transfer your sBTC anytime; rewards adjust accordingly. Learn more about sBTC ->"
        description="*The rewards rate is an estimate based on current protocol parameters and may vary over time. Learn more by following the link above."
        image={<EarnWithSBTCImage />}
      />
      <EarnBTCSectionContainer>
        <BridgeToSBTCCard {...props} />
        <EnrollForSBTCRewardsCard {...props} />
      </EarnBTCSectionContainer>
    </Box>
  );
};
