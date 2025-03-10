import { useState } from 'react';

import { Button } from '@leather.io/ui';
import { intToBigInt } from '@stacks/common';
import { ExtendedAccountBalances, StackerInfo } from '@stacks/stacking';
import { Flex, styled } from 'leather-styles/jsx';
import { DelegationInfoDetails } from 'src/types/stacking';

import { Address } from '@components/address';
import { Hr } from '@components/hr';
import {
  InfoCardGroup as Group,
  InfoCardLabel as Label,
  InfoCardRow as Row,
  InfoCardSection as Section,
  InfoCardValue as Value,
} from '@components/info-card';
import routes from '@constants/routes';
import { useNavigate } from '@hooks/use-navigate';
import { useStacksNetwork } from '@hooks/use-stacks-network';
import { formatPoxAddressToNetwork } from '@utils/stacking';
import { toHumanReadableStx } from '@utils/unit-convert';

import { StackerDetailsRows } from '../../components/stacker-details-rows';
import { PoxContractName } from '../../start-pooled-stacking/types-preset-pools';
import { getPoxContracts } from '../../start-pooled-stacking/utils-preset-pools';
import { IncreasePoolingAmount } from './increase-pooling-amount';
import { PercentageRow } from './percentage-row';
import { SelfServiceRows } from './self-service-rows';

interface ActivePoolingContentProps {
  delegationInfoDetails: DelegationInfoDetails;
  isStacking: boolean;
  poolAddress: string;
  isContractCallExtensionPageOpen: boolean;
  stackerInfo: StackerInfo;
  extendedStxBalance: ExtendedAccountBalances['stx'];
  handleStopPoolingClick: () => void;
}
export function ActivePoolingContent({
  delegationInfoDetails,
  poolAddress,
  isContractCallExtensionPageOpen,
  handleStopPoolingClick,
  extendedStxBalance,
  stackerInfo,
}: ActivePoolingContentProps) {
  const navigate = useNavigate();
  const isStacking = stackerInfo.stacked;
  const [showIncreasePoolingAmount, setShowIncreasePoolingAmount] = useState(false);
  const { network } = useStacksNetwork();
  const isSelfService =
    delegationInfoDetails.delegated_to ===
      getPoxContracts(network)[PoxContractName.WrapperFastPool] ||
    delegationInfoDetails.delegated_to ===
      getPoxContracts(network)[PoxContractName.WrapperFastPoolV2] ||
    delegationInfoDetails.delegated_to === getPoxContracts(network)[PoxContractName.WrapperRestake];
  return (
    <>
      <styled.p textStyle="body.large.medium" color={'ink.text-subdued'}>
        You&apos;re pooling
      </styled.p>
      <styled.p fontSize="24px" mb="space.02" fontWeight={500} mt="extra-tight">
        {toHumanReadableStx(delegationInfoDetails.amount_micro_stx)}
      </styled.p>

      <Hr />

      <Group my="extra-loose">
        <Section>
          <Row>
            <Label>Status</Label>
            <Value color={isStacking ? 'green' : 'ink.'}>
              {isStacking ? 'Active' : 'Waiting on pool'}
            </Value>
          </Row>
          <PercentageRow extendedStxBalances={extendedStxBalance} />
          {isStacking && (
            <>
              <StackerDetailsRows
                stackerInfoDetails={stackerInfo.details}
                poxAddress={formatPoxAddressToNetwork(network, stackerInfo.details.pox_address)}
              />
              <Row>
                <Label>Stacked amount</Label>
                <Value>{toHumanReadableStx(intToBigInt(extendedStxBalance.locked))}</Value>
              </Row>
            </>
          )}
          <Row>
            <Label>Type</Label>
            <Value>
              {delegationInfoDetails.until_burn_ht ? 'Limted permission' : 'Indefinite permission'}
            </Value>
          </Row>
          <Row>
            <Label>Pool address</Label>
            <Value>
              <Address address={poolAddress} />
            </Value>
          </Row>
          {isSelfService && isStacking && !showIncreasePoolingAmount && <SelfServiceRows />}
          {showIncreasePoolingAmount ? (
            <IncreasePoolingAmount
              isSelfService={isSelfService}
              handleStopPoolingClick={() => {
                setShowIncreasePoolingAmount(false);
                handleStopPoolingClick();
              }}
              handleKeepPoolingClick={() => setShowIncreasePoolingAmount(false)}
              handleDelegateAgainClick={() => navigate(routes.START_POOLED_STACKING)}
            />
          ) : (
            <Flex>
              <Button fullWidth variant="solid" onClick={() => setShowIncreasePoolingAmount(true)}>
                Increase pooling amount
              </Button>
            </Flex>
          )}
        </Section>
      </Group>

      <Group mt="space.02">
        <Section>
          {!showIncreasePoolingAmount && (
            <Flex justify={'center'}>
              <Label>
                <Button
                  variant="ghost"
                  fullWidth
                  disabled={isContractCallExtensionPageOpen}
                  onClick={() => {
                    handleStopPoolingClick();
                  }}
                >
                  Stop pooling
                </Button>
              </Label>
            </Flex>
          )}
        </Section>
      </Group>
    </>
  );
}
