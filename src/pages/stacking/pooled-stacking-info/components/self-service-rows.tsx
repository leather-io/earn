import { useNavigate } from 'react-router-dom';

import { Button } from '@stacks/ui';

import {
  InfoCardLabel as Label,
  InfoCardRow as Row,
  InfoCardValue as Value,
} from '@components/info-card';
import {
  useGetCoreInfoQuery,
  useGetPoxInfoQuery,
} from '@components/stacking-client-provider/stacking-client-provider';
import routes from '@constants/routes';

import { nextExtend } from '../../self-service-extend/utils';

export function SelfServiceRows() {
  const navigate = useNavigate();
  const getPoxInfoQuery = useGetPoxInfoQuery();
  const getCoreInfoQuery = useGetCoreInfoQuery();
  const burnBlockHeight = getCoreInfoQuery.data?.burn_block_height;

  if (!getPoxInfoQuery.data || !burnBlockHeight) {
    return <></>;
  }
  const { blocks, tooEarly } = nextExtend(burnBlockHeight, getPoxInfoQuery.data);
  return (
    <>
      <Row justifyContent="space-evenly">
        <Label>Until next extend</Label>
        <Value>{blocks}</Value>
      </Row>
      <Row justifyContent="space-evenly">
        <Button isDisabled={tooEarly} onClick={() => navigate(routes.SELF_SERVICE_EXTEND)}>
          Extend pooled stacking
        </Button>
      </Row>
    </>
  );
}
