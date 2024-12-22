import { useEffect, useMemo } from 'react';

import { Button } from '@leather.io/ui';
import { IconLock } from '@tabler/icons-react';
import { useField, useFormikContext } from 'formik';
import { Box, Flex, styled } from 'leather-styles/jsx';
import { StackerInfoDetails } from 'src/types/stacking';

import { Address } from '@components/address';
import { BaseDrawer } from '@components/drawer/base-drawer';
import { ErrorLabel } from '@components/error-label';
import { ErrorText } from '@components/error-text';
import { Hr } from '@components/hr';
import {
  InfoCardGroup as Group,
  InfoCard,
  InfoCardLabel as Label,
  InfoCardRow as Row,
  InfoCardSection as Section,
  InfoCardValue as Value,
} from '@components/info-card';
import { MAX_STACKING_CYCLES, MIN_STACKING_CYCLES } from '@constants/app';
import routes from '@constants/routes';
import { useNavigate } from '@hooks/use-navigate';
import { useSIP22 } from '@hooks/use-sip-22';
import { useStacksNetwork } from '@hooks/use-stacks-network';
import { hasErrors } from '@utils/form/has-errors';
import { formatPoxAddressToNetwork } from '@utils/stacking';

import { OneCycleDescriptor } from '../../components/one-cycle-descriptor';
import { PendingStackExtendAlert } from '../../components/pending-stack-extend-alert';
import { Description } from '../../components/stacking-form-step';
import { Stepper } from '../../components/stepper';
import { StackExtendInfo } from '../../direct-stacking-info/get-has-pending-stack-extend';
import { SignerDetails } from '../../pool-admin/stack-aggregation-commit/components/signer-details';
import { EditingFormValues } from '../utils';

interface StackExtendLayoutProps {
  title: string;
  details: StackerInfoDetails;
  pendingStackExtend: StackExtendInfo | undefined | null;
  isContractCallExtensionPageOpen: boolean;
}
export function StackExtendLayout(props: StackExtendLayoutProps) {
  const { title, details, pendingStackExtend, isContractCallExtensionPageOpen } = props;
  const { poxDisabled } = useSIP22();
  const navigate = useNavigate();
  const { network } = useStacksNetwork();
  const poxAddress = formatPoxAddressToNetwork(network, details.pox_address);
  const { errors } = useFormikContext<EditingFormValues>();
  const [field, meta, helpers] = useField('extendCycles');
  const onClose = () => {
    navigate(routes.DIRECT_STACKING_INFO);
  };
  const end = details.first_reward_cycle + details.lock_period - 1 + field.value;

  // Add console.errors for any undisplayed errors
  const errorMsg = useMemo(() => {
    if (!hasErrors(errors)) return;
    return Object.entries(errors)
      .map(([key, value]) => {
        return `${key}: ${value}`;
      })
      .join('\n');
  }, [errors]);

  useEffect(() => {
    if (errorMsg) {
      console.error(errorMsg);
    }
  }, [errorMsg]);

  return (
    <BaseDrawer title={title} isShowing={!poxDisabled} onClose={onClose}>
      <Flex alignItems="center" flexDirection="column" pb={['space.04', '48px']} px="space.04">
        <InfoCard width="420px">
          <Box mx={['space.04', 'space.06']}>
            <Flex flexDirection="column" pt="space.05" pb="space.04">
              <styled.h2 textStyle="heading.02">You&apos;re stacking</styled.h2>
              <styled.p fontSize="24px" fontWeight={500} mt="space.01">
                for {details.lock_period} cycles
              </styled.p>
            </Flex>
            <Hr />
            {pendingStackExtend && (
              <PendingStackExtendAlert pendingStackExtend={pendingStackExtend} />
            )}
            <Description>
              <styled.p>
                Increase the amount of cycles you want to lock your STX. Currently each cycle lasts
                around 15 days and the maximum locked period is 12 cycles.
              </styled.p>
            </Description>

            <Flex justifyContent="center">
              <Stepper
                mt="loose"
                amount={field.value}
                onIncrement={cycle => {
                  if (cycle > MAX_STACKING_CYCLES) return;
                  helpers.setTouched(true);
                  helpers.setValue(cycle);
                }}
                onDecrement={cycle => {
                  if (cycle < MIN_STACKING_CYCLES) return;
                  helpers.setTouched(true);
                  helpers.setValue(cycle);
                }}
              />
            </Flex>
            {meta.touched && meta.error && (
              <ErrorLabel>
                <ErrorText>{meta.error}</ErrorText>
              </ErrorLabel>
            )}
            <OneCycleDescriptor mt="space.04" />
            <Group pt="space.04">
              <Section>
                <Row>
                  <Label explainer="STX will unlock after that cycle">End</Label>
                  <Value>Cycle {end} </Value>
                </Row>
                <Row>
                  <Label>Bitcoin address</Label>
                  <Value>
                    <Address address={poxAddress} />
                  </Value>
                </Row>
                <SignerDetails />
                <Row my="space.04" justifyContent="space-between">
                  <Button variant="outline" onClick={onClose}>
                    Cancel
                  </Button>
                  <Button
                    _loading={{ opacity: 0.5 }}
                    disabled={hasErrors(errors) || isContractCallExtensionPageOpen}
                    type="submit"
                  >
                    <Flex flexDirection="row" alignItems="center" justifyContent="center">
                      <IconLock />
                      &nbsp; Continue Stacking
                    </Flex>
                  </Button>
                </Row>
              </Section>
            </Group>
          </Box>
        </InfoCard>
      </Flex>
    </BaseDrawer>
  );
}
