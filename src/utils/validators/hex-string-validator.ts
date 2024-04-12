import * as yup from 'yup';

export function hexStringSchema() {
  return yup.string().transform((hex: string) => {
    return `${hex.replaceAll('0x', '')}`;
  });
}
