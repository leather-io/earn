import { Button } from '@leather.io/ui';

import { WrapperPrincipal } from '../types-preset-pools';

export function PoolContractDisallowButton({
  wrapperPrincipal,
  handleSubmit,
}: {
  wrapperPrincipal: WrapperPrincipal;
  handleSubmit(val: WrapperPrincipal): void;
}) {
  return (
    <>
      <Button
        variant="ghost"
        size="sm"
        mx="extra-tight"
        onClick={() => handleSubmit(wrapperPrincipal)}
      >
        I don&apos;t trust this contract anymore.
      </Button>
    </>
  );
}
