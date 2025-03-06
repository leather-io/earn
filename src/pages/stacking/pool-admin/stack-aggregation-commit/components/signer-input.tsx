import { ReactNode } from 'react';

import { Input } from '@leather.io/ui';
import { useField } from 'formik';
import { Box } from 'leather-styles/jsx';

import { ErrorLabel } from '@components/error-label';
import { ErrorText } from '@components/error-text';
import { Title } from '@components/title';

interface Props {
  title: string;
  text: ReactNode;
  fieldName: string;
  placeholder: string;
}

export function SignerInput({ title, text, fieldName, placeholder }: Props) {
  const [field, meta, helpers] = useField(fieldName);
  return (
    <>
      <Title
        fontFamily="diatype"
        fontWeight="500"
        textTransform="unset"
        fontSize="26px"
        mt="space.06"
      >
        {title}
      </Title>
      {text}
      <Box position="relative" maxWidth="400px" mt="space.05">
        <Input.Root>
          <Input.Label>{placeholder}</Input.Label>
          <Input.Field
            autoComplete="off"
            {...field}
            onChange={e => {
              if ('value' in e.target) {
                const { value } = e.target;
                if (!value) return field.onChange(e);
                return helpers.setValue(value.replaceAll('0x', ''));
              }
              return field.onChange(e);
            }}
          />
        </Input.Root>
        {meta.touched && meta.error && (
          <ErrorLabel>
            <ErrorText>{meta.error}</ErrorText>
          </ErrorLabel>
        )}
      </Box>
    </>
  );
}
