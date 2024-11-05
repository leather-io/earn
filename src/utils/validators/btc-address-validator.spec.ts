import { expect, test } from 'vitest';

import { validateBtcAddress } from '@utils/validators/btc-address-validator';

test('validation p2wsh', () => {
  const addr = 'bc1qun60xhsf28d3hcuxlxxg59e3er7vvgzvwvg8pkw4scc7gk3mjkcsa5fkgu';
  const validation = validateBtcAddress(addr, 'mainnet');
  expect(validation).toEqual(true);
});
