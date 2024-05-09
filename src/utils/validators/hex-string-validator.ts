import * as yup from 'yup';

export function hexStringSchema() {
  return yup.string().test('no-0x', 'Value may not start with 0x', value => {
    if (typeof value !== 'string') return true;
    if (!value.length) return true;
    return !value.startsWith('0x');
  });
}
