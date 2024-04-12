import BigNumber from 'bignumber.js';

export function parseNumber(num: string | number | BigNumber | bigint) {
  const n = typeof num === 'bigint' ? num.toString() : num;
  return new BigNumber(n);
}

export function microStxToStx(microStx: string | number | bigint | BigNumber): BigNumber {
  const amount = parseNumber(typeof microStx === 'bigint' ? microStx.toString() : microStx);
  if (!amount.isInteger()) throw new Error('Micro STX can only be represented as integers');
  return amount.dividedBy(10 ** 6);
}

/**
 *
 * @param microStx amount of micro stacks
 * @returns the amount as stacks amount rounded to the lower number.
 */
export function microStxToStxRounded(microStx: string | number | bigint | BigNumber): BigNumber {
  const amount = parseNumber(typeof microStx === 'bigint' ? microStx.toString() : microStx);
  if (!amount.isInteger()) throw new Error('Micro STX can only be represented as integers');
  return amount.dividedToIntegerBy(10 ** 6);
}

export function stxToMicroStx(microStx: string | number | bigint | BigNumber): BigNumber {
  const amount = parseNumber(typeof microStx === 'bigint' ? microStx.toString() : microStx);
  return amount.multipliedBy(1000000);
}

export function toHumanReadableStx(microStx: string | number | bigint | BigNumber): string {
  const amount = microStxToStx(microStx);
  return amount.toFormat() + ' STX';
}

// Max U128 is too large for BigNumber
export function stxToMicroStxBigint(stx: bigint | string | number): string {
  return parseNumber(stx).shiftedBy(6).decimalPlaces(0).toString(10);
}

// Max U128 is too large for BigNumber
export function microStxToStxBigint(microStx: bigint | string | number): string {
  return parseNumber(microStx).shiftedBy(-6).decimalPlaces(6).toString(10);
}
