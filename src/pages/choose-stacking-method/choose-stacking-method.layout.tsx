import { css } from 'leather-styles/css';
import { Box, Stack, styled } from 'leather-styles/jsx';
import { BridgeToSBTCCard } from 'src/pages/choose-stacking-method/components/bridge-to-sbtc-card';
import { EnrollForSBTCRewardsCard } from 'src/pages/choose-stacking-method/components/enroll-for-sbtc-rewards';
import { SectionHero } from 'src/pages/choose-stacking-method/components/section-hero';

import { StackingDisclaimer } from '@components/stacking-disclaimer';

import BTCBall from '../../assets/images/btc-ball.svg';
import EarnWithSBTCImage from '../../assets/images/earn-with-btc-image.svg';
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

export function ChooseStackingMethodLayout(props: ChooseStackingMethodLayoutProps) {
  return (
    <Box width="100%" background="ink.background-secondary">
      <StartStackingLayout>
        <PageTitle />
        <Stack height="100%" gap="space.00" paddingBottom="space.11" justifyContent="center">
          {props.isSignedIn && (
            <Box>
              <Messages {...props} />
            </Box>
          )}

          {/* <EarnWithSBTCSection {...props} /> */}
          <StackingSection {...props} />
        </Stack>
      </StartStackingLayout>
    </Box>
  );
}

const PageTitle = () => {
  return (
    <Box
      paddingY="space.11"
      className={css({
        mx: { base: 'space.06', '2xl': '0' },
      })}
    >
      <styled.section position="relative">
        <styled.h1
          textStyle="display.01"
          fontSize="108px"
          textTransform="uppercase"
          style={{ lineHeight: '0.8' }}
        >
          Earn bitcoin{' '}
          <styled.span
            className={css({
              position: 'absolute',
              display: { smOnly: 'none' },
              top: { smOnly: '130px', mdOnly: '128px', lg: '-50px' },
              left: { smOnly: '160px', mdOnly: '428px', lg: '690px' },
            })}
          >
            <BTCBall />
          </styled.span>{' '}
          yield via Leather
        </styled.h1>
      </styled.section>
      <styled.p my="space.04" textStyle="body.01" fontSize="21px">
        Earn Bitcoin yield by bridging BTC into sBTC or stacking your STX.
      </styled.p>
      <StackingDisclaimer />
    </Box>
  );
};

const StackingSection = (props: ChooseStackingMethodLayoutProps) => {
  return (
    <>
      <SectionHero
        title="Earn with stacking"
        subtitle="By stacking, you temporarily lock up your tokens in order to provide valuable information to Stacks' consensus mechanism. 
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

export const EarnWithSBTCSection = (props: ChooseStackingMethodLayoutProps) => {
  return (
    <Box mb="space.09">
      <SectionHero
        title="Earn Rewards with BTC"
        subtitle="sBTC is a 1:1 Bitcoin-backed asset on Stacks, Bitcoin's leading Layer 2. Bridge BTC to sBTC to access DeFi, NFTs, and ~5% Bitcoin yield* while keeping full liquidity and self-custody. Transfers adjust rewards dynamically."
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
