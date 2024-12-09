import { useMemo } from 'react';

import { BigNumber } from 'bignumber.js';
import { useFormikContext } from 'formik';
import { Box, Flex, styled } from 'leather-styles/jsx';
import { SignatureSection } from 'src/pages/stacking/signer/generate-signature/components/signature-section';

import { Hr } from '@components/hr';
import {
  InfoCardGroup as Group,
  InfoCard,
  InfoCardLabel as Label,
  InfoCardRow as Row,
  InfoCardSection as Section,
  InfoCardValue as Value,
} from '@components/info-card';
import { useGetPoxInfoQuery } from '@components/stacking-client-provider/stacking-client-provider';
import { parseNumericalFormInput } from '@utils/form/parse-numerical-form-input';
import { truncateMiddle } from '@utils/tx-utils';
import { stxToMicroStx, toHumanReadableStx } from '@utils/unit-convert';

import { calculateRewardSlots, calculateStackingBuffer } from '../../../utils/calc-stacking-buffer';
import { createAmountText } from '../../../utils/create-amount-text';
import { DirectStackingFormValues } from '../../types';

export function InfoPanel() {
  const f = useFormikContext<DirectStackingFormValues>();
  const getPoxInfoQuery = useGetPoxInfoQuery();

  const { amount, lockPeriod, poxAddress, signerKey, signerSignature, maxAmount, authId } =
    f.values;

  const amountToBeStacked = useMemo(
    () => stxToMicroStx(parseNumericalFormInput(amount)).integerValue(),
    [amount]
  );

  const numberOfRewardSlots = calculateRewardSlots(
    amountToBeStacked,
    new BigNumber(getPoxInfoQuery.data?.min_amount_ustx || 0)
  ).integerValue();

  const buffer = calculateStackingBuffer(
    amountToBeStacked,
    new BigNumber(getPoxInfoQuery.data?.min_amount_ustx || 0)
  );

  return (
    <InfoCard minHeight="84px">
      <Box>
        <Flex flexDirection="column" pb="space.04">
          <styled.p textStyle="body.large.medium" color="ink.text-subdued">
            You&apos;ll lock
          </styled.p>
          <styled.h4 textStyle="heading.04" mt="extra-tight" color="ink.text-primary">
            {createAmountText(amount ?? 0)}
          </styled.h4>
        </Flex>

        <Hr />

        <Group width="100%">
          <Section>
            <Row>
              <Label explainer="This is the estimated number of reward slots. The minimum can change before the next cycle begins.">
                Reward slots
              </Label>
              <Value>{numberOfRewardSlots.toString()}</Value>
            </Row>

            <Row>
              <Label>Buffer</Label>
              <Value>{buffer === null ? 'No buffer' : toHumanReadableStx(buffer)}</Value>
            </Row>
          </Section>

          <Section>
            <Row>
              <Label
                explainer={`One cycle lasts ${getPoxInfoQuery.data?.reward_cycle_length} blocks on the Bitcoin blockchain`}
              >
                Cycles
              </Label>
              <Value>{lockPeriod}</Value>
            </Row>
          </Section>

          <Section>
            <Row>
              <Label>Bitcoin address</Label>
              <Value>{poxAddress ? truncateMiddle(poxAddress) : '—'}</Value>
            </Row>
          </Section>

          <SignatureSection
            signatureData={
              signerSignature && signerKey
                ? { signature: signerSignature, publicKey: signerKey, maxAmount, authId }
                : undefined
            }
          />
        </Group>
      </Box>
    </InfoCard>
  );
}
