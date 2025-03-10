import { PropsWithChildren, forwardRef } from 'react';

import { Input } from '@leather.io/ui';
import { useField } from 'formik';
import { Box } from 'leather-styles/jsx';

interface CryptoAddressInputProps extends PropsWithChildren<typeof Input.Field.defaultProps> {
  fieldName: string;
  addressType?: 'BTC' | 'STX';
}

export const CryptoAddressInput = forwardRef<HTMLInputElement, CryptoAddressInputProps>(
  (props, ref) => {
    const { fieldName, children, addressType, placeholder, ...rest } = props;
    const [field] = useField(fieldName);
    return (
      <>
        <Box mt="space.05" maxWidth="400px">
          <Input.Root>
            <Input.Label>
              {placeholder ? placeholder :
                addressType === 'BTC'
                  ? 'Bitcoin address (Legacy, Native SegWit or Taproot)'
                  : addressType === 'STX'
                    ? 'Stacks address'
                    : undefined}
            </Input.Label>
            <Input.Field
              id={fieldName}
              name={fieldName}
              style={{ fontFamily: field?.value?.length ? 'monospace' : 'unset' }}
              ref={ref}
              {...rest}
            />
          </Input.Root>
        </Box>
        {children}
      </>
    );
  }
);
CryptoAddressInput.displayName = 'CryptoAddressInput';
