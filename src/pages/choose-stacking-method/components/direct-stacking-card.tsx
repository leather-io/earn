import { StackingMethodCard } from 'src/pages/choose-stacking-method/components/stacking-method-card';
import { useDirectStackingButton } from 'src/pages/choose-stacking-method/hooks';

import FishBowlIllustration from '@assets/images/stack-by-yourself.svg';
import { Unassignee } from '@components/icons/unassignee';
import { toHumanReadableStx } from '@utils/unit-convert';

import { ChooseStackingMethodLayoutProps } from '../types';

import IconLock from '@assets/images/ic-lock.svg';
import IconBalance from '@assets/images/ic-balance.svg';
import IconUser from '@assets/images/ic-user.svg';

export function DirectStackingCard(props: ChooseStackingMethodLayoutProps) {
  const { isDisabled, onClick } = useDirectStackingButton(props);
  const benefits = [
    { icon: IconLock, title: 'Interact with the protocol directly' },
    { icon: IconUser, title: 'No intermediaries' },
    {
      icon: IconBalance,
      title: props.isSignedIn
        ? `Dynamic minimum (currently ${toHumanReadableStx(props.stackingMinimumAmountUstx)})`
        : 'Dynamic minimum',
    },
  ];

  return (
    <StackingMethodCard
      {...props}
      title="Stack independently"
      description="When you stack Independently, you'll interact with the protocol directly. This approach could be suitable if you prefer stacking in a trustless manner and meet the minimum requirement"
      icon={<FishBowlIllustration />}
      benefits={benefits}
      onButtonPress={onClick}
      buttonDisabled={isDisabled}
      buttonText="Stack independently"
      hasSufficientBalance={props.isSignedIn && props.hasEnoughBalanceToDirectStack}
    />
  );
}

// export function DirectStackingCard(props: ChooseStackingMethodLayoutProps) {
//   return (
//     <Card mt={['extra-loose', null, null, 'unset']}>
//       <Box height="130px">
//         <FishBowlIllustration />
//       </Box>
//       <StackingOptionCardTitle>Stack independently</StackingOptionCardTitle>

//       <Description>
//         When you stack Independently, you&apos;ll interact with the protocol directly. This approach
//         could be suitable if you prefer stacking in a trustless manner and meet the minimum
//         requirement
//       </Description>

//       <OptionBenefitContainer>
//         <OptionBenefit icon={IconLock}>Interact with the protocol directly</OptionBenefit>
//         <OptionBenefit icon={Unassignee}>No intermediaries</OptionBenefit>

//         {/* TODO: this is a small hack to show this last bullet point when the user is not signed in.
//         Unfortunately, the StacksClient, which is being used extensively to fetch stacking data,
//         requires an address in the constructor, even though some endpoints do not require any
//         address info. As such, when the user is not logged in, we must fetch the minimum stacking
//         amount directly from the API without using the client. */}
//         {props.isSignedIn ? (
//           <OptionBenefit icon={IconStairs}>
//             Dynamic minimum (currently {toHumanReadableStx(props.stackingMinimumAmountUstx)})
//           </OptionBenefit>
//         ) : (
//           <OptionBenefit icon={IconStairs}>Dynamic minimum</OptionBenefit>
//         )}
//       </OptionBenefitContainer>

//       <Flex alignItems="center">
//         <DirectStackingButton {...props} />
//         <DirectStackingInsufficientStackingBalanceWarning {...props} />
//       </Flex>
//     </Card>
//   );
// }
