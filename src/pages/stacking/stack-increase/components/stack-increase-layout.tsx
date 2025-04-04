import { useNavigate } from 'react-router-dom';

import { Button } from '@leather.io/ui';
import { ExtendedAccountBalances } from '@stacks/stacking';
import { IconLock } from '@tabler/icons-react';
import { useFormikContext } from 'formik';
import { Box, Flex, styled } from 'leather-styles/jsx';

import { BaseDrawer } from '@components/drawer/base-drawer';
import { Hr } from '@components/hr';
import {
  InfoCardGroup as Group,
  InfoCard,
  InfoCardRow as Row,
  InfoCardSection as Section,
} from '@components/info-card';
import routes from '@constants/routes';
import { useSIP22 } from '@hooks/use-sip-22';
import { hasErrors } from '@utils/form/has-errors';
import { toHumanReadableStx } from '@utils/unit-convert';

import { PendingStackIncreaseAlert } from '../../components/pending-stack-increase-alert';
import { StackIncreaseInfo } from '../../direct-stacking-info/get-has-pending-stack-increase';
import { SignerDetails } from '../../pool-admin/stack-aggregation-commit/components/signer-details';
import { EditingFormValues } from '../utils';
import { Amount } from './choose-amount';

interface StackIncreaseLayoutProps {
  title: string;
  extendedStxBalances: ExtendedAccountBalances['stx'];
  pendingStackIncrease: StackIncreaseInfo | undefined | null;
  isContractCallExtensionPageOpen: boolean;
}
export function StackIncreaseLayout(props: StackIncreaseLayoutProps) {
  const { poxDisabled } = useSIP22();
  const { title, extendedStxBalances, pendingStackIncrease, isContractCallExtensionPageOpen } =
    props;
  const navigate = useNavigate();
  const { errors } = useFormikContext<EditingFormValues>();
  const onClose = () => {
    navigate(routes.DIRECT_STACKING_INFO);
  };
  return (
    <BaseDrawer title={title} isShowing={!poxDisabled} onClose={onClose}>
      <Flex alignItems="center" flexDirection="column" pb={['space.03', '48px']} px="space.03">
        <InfoCard width="420px">
          <Box mx={['space.03', 'space.04']}>
            <Flex flexDirection="column" pt="space.04" pb="space.02">
              <styled.h2 textStyle="heading.02">You&apos;re stacking</styled.h2>
              <styled.p fontSize="24px" fontWeight={500} letterSpacing="-0.02em">
                {toHumanReadableStx(extendedStxBalances.locked.toString())}
              </styled.p>
            </Flex>

            <Hr />

            {pendingStackIncrease && (
              <PendingStackIncreaseAlert pendingStackIncrease={pendingStackIncrease} />
            )}

            <Group pt="base-loose">
              <Section>
                <Row>
                  <Amount />
                </Row>

                <SignerDetails />

                <Row m="loose" justifyContent="space-between">
                  <Button variant="outline" onClick={onClose} type="submit">
                    Cancel
                  </Button>
                  <Button aria-busy={isContractCallExtensionPageOpen} disabled={hasErrors(errors)}>
                    <Box mr="space.03">
                      <IconLock />
                    </Box>
                    Confirm Increase
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
