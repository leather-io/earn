import { Flex, styled } from 'leather-styles/jsx';
import { StackerInfoDetails } from 'src/types/stacking';

import { toHumanReadableStx } from '@utils/unit-convert';

export function SelfServiceExtendHeader({
  stackerInfoDetails,
  showExtendForOtherUser,
  lockedBalance,
}: {
  stackerInfoDetails: StackerInfoDetails | undefined;
  showExtendForOtherUser: boolean;
  lockedBalance: bigint;
}) {
  return (
    <Flex flexDirection="column" pt="extra-loose" pb="base-loose">
      {stackerInfoDetails && !showExtendForOtherUser ? (
        <>
          <styled.h2 textStyle="heading.02">You&apos;re stacking</styled.h2>
          <styled.h2
            textStyle="heading.02"
            fontSize="24px"
            fontWeight={500}
            letterSpacing="-0.02em"
          >
            {toHumanReadableStx(lockedBalance)}
          </styled.h2>
        </>
      ) : (
        <>
          <styled.h2 textStyle="heading.02">Self-service pooling with</styled.h2>
          <styled.h2
            textStyle="heading.02"
            fontSize="24px"
            fontFamily="Open Sauce"
            fontWeight={500}
            letterSpacing="-0.02em"
            mt="extra-tight"
          >
            Fast Pool
          </styled.h2>
        </>
      )}
    </Flex>
  );
}
