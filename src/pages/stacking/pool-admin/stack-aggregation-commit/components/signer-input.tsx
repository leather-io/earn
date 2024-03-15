import { ErrorLabel } from '@components/error-label';
import { ErrorText } from '@components/error-text';
import { Title } from '@components/title';
import { Box, Input } from '@stacks/ui';
import { FieldInputProps, FieldMetaProps, useField } from 'formik';
import { ReactNode } from 'react';

interface Props {
  title: string;
  text: ReactNode;
  fieldName: string;
  placeholder: string;
}

export function SignerInput({ title, text, fieldName, placeholder }: Props) {
  const [field, meta] = useField(fieldName);
  return (
    <>
      <Title fontSize="20px">{title}</Title>
      {text}
      <Box position="relative" maxWidth="400px">
        <Input {...field} mt={'loose'} placeholder={placeholder} />
        {meta.touched && meta.error && (
          <ErrorLabel>
            <ErrorText>{meta.error}</ErrorText>
          </ErrorLabel>
        )}
      </Box>
    </>
  );
}
