import { ReactNode } from 'react';

import { Box, Input } from '@stacks/ui';
import { useField } from 'formik';

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
      <Title fontSize="20px">{title}</Title>
      {text}
      <Box position="relative" maxWidth="400px">
        <Input
          {...field}
          mt={'loose'}
          onChange={e => {
            if ('value' in e.target) {
              const { value } = e.target;
              if (!value) return field.onChange(e);
              return helpers.setValue(value.replaceAll('0x', ''));
            }
            return field.onChange(e);
          }}
          placeholder={placeholder}
        />
        {meta.touched && meta.error && (
          <ErrorLabel>
            <ErrorText>{meta.error}</ErrorText>
          </ErrorLabel>
        )}
      </Box>
    </>
  );
}
