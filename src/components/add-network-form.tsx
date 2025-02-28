import { useNavigate } from 'react-router-dom';

import { Button, Input } from '@leather.io/ui';
import { Configuration, InfoApi } from '@stacks/blockchain-api-client';
import { ChainId } from '@stacks/network';
import { Field, FieldProps, Form, Formik, FormikErrors } from 'formik';
import { Box, Stack } from 'leather-styles/jsx';
import { string } from 'yup';

import { createSearch } from '@utils/networks';

import { NetworkIdModeMap } from '../constants/network';
import { useGlobalContext } from '../context/use-app-context';
import { Network } from '../types/network';
import { ErrorLabel } from './error-label';
import { ErrorText } from './error-text';

const buildCustomNetworkUrl = (url: string) => {
  const hostname = encodeURIComponent(new URL(url).hostname);
  const port = encodeURIComponent(new URL(url).port);
  return `${hostname === 'localhost' ? 'http://' : 'https://'}${hostname}${port ? `:${port}` : ''}`;
};

const fetchCustomNetworkId: (url: string) => Promise<ChainId | undefined> = (url: string) => {
  return new InfoApi(new Configuration({ basePath: url }))
    .getCoreApiInfo()
    .then(res =>
      Object.values(ChainId).includes(res.network_id) ? (res.network_id as ChainId) : undefined
    )
    .catch();
};

interface FormValues {
  label: string;
  url: string;
  genericError?: string;
}

export const AddNetworkForm: React.FC = () => {
  const { addCustomNetwork } = useGlobalContext();
  const navigate = useNavigate();
  return (
    <Formik
      validateOnChange={false}
      validateOnBlur={false}
      initialValues={{
        label: '',
        url: '',
      }}
      validate={async (values: FormValues) => {
        const errors: FormikErrors<FormValues> = {};
        if (!values.label) {
          errors.label = 'You need to specify a label for this network.';
        }
        if (!values.url) {
          errors.url = 'You need to specify a URL for this network.';
        } else {
          const isValid = await string()
            .matches(
              /^(?:([a-z0-9+.-]+):\/\/)(?:\S+(?::\S*)?@)?(?:(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*\.?)(?::\d{2,5})?(?:[/?#]\S*)?$/
            )
            .isValid(values.url);
          if (!isValid) {
            errors.url = 'Please check the formatting of the URL passed.';
          } else {
            try {
              const networkId = await fetchCustomNetworkId(buildCustomNetworkUrl(values.url));
              if (!networkId) {
                errors.genericError = 'The API did not return a valid network_id.';
              }
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
            } catch (e: any) {
              if (e.message.includes('Failed to fetch')) {
                errors.genericError = 'Could not connect to supplied network URL.';
              } else {
                errors.genericError = e.message;
              }
            }
          }
        }
        return errors;
      }}
      onSubmit={async ({ url, label }) => {
        const networkUrl = buildCustomNetworkUrl(url);
        const networkId = await fetchCustomNetworkId(networkUrl);

        if (networkId) {
          const network: Network = {
            label: label.trim(),
            url: networkUrl,
            networkId,
            mode: NetworkIdModeMap[networkId],
            isCustomNetwork: true,
          };
          void addCustomNetwork(network).then(() => {
            navigate({ pathname: '/', search: createSearch(network) });
          });
        }
      }}
    >
      {form => (
        <Form>
          <Stack gap="space.04">
            <Stack gap="space.02">
              <Field name="label">
                {({ field, form }: FieldProps<string, FormValues>) => (
                  <Box>
                    <Input.Root>
                      <Input.Label>Name</Input.Label>

                      <Input.Field id="label" {...field} />
                    </Input.Root>
                    {form.touched && form.errors.label && (
                      <ErrorLabel>
                        <ErrorText>{form.errors.label}</ErrorText>
                      </ErrorLabel>
                    )}
                  </Box>
                )}
              </Field>
              <Field name="url">
                {({ field, form }: FieldProps<string, FormValues>) => (
                  <Box>
                    <Input.Root>
                      <Input.Label>URL</Input.Label>
                      <Input.Field id="url" {...field} />
                    </Input.Root>
                    {form.touched && form.errors.url && (
                      <ErrorLabel>
                        <ErrorText>{form.errors.url}</ErrorText>
                      </ErrorLabel>
                    )}
                  </Box>
                )}
              </Field>
            </Stack>
            <Field name="genericError">
              {({ form }: FieldProps<string, FormValues>) => (
                <Box style={{ marginTop: 0 }}>
                  {form.touched && form.errors.genericError && (
                    <ErrorLabel>
                      <ErrorText>{form.errors.genericError}</ErrorText>
                    </ErrorLabel>
                  )}
                </Box>
              )}
            </Field>
            <Box>
              <Button variant="solid" disabled={form.isValidating} width="100%" type="submit">
                Add and select
              </Button>
            </Box>
          </Stack>
        </Form>
      )}
    </Formik>
  );
};
