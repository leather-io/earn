import * as yup from "yup";

const payloadSchema = yup.object({
  stxAddresses: yup.array(yup.string().required()),
  btcAddresses: yup.array(yup.string().required()),
});

export interface Payload extends yup.InferType<typeof payloadSchema> {
  // using interface instead of type generally gives nicer editor feedback
}

export function isPayload(value: any): value is Payload {
  try {
    payloadSchema.validateSync(value);
    return true;
  } catch {
    return false;
  }
}

/**
 * Schema of data used from the `GET https://ordapi.xyz/address/:address` endpoint. Additional data
 * that is not currently used by the app may be returned by this endpoint.
 *
 * See API docs, https://ordapi.xyz/
 */
export const ordApiXyzGetInscriptionByAddressSchema = yup
  .array(
    yup.object({
      // NOTE: this next key is using a space " ". Given the API is being actively developed and how
      // uncommon it is to use a space in a key name, code relying on this schema will break when the
      // API authors choose a more streamlined name.
      ["content type"]: yup.string().required(),

      content: yup.string().required(),
      preview: yup.string().required(),
    })
  )
  .required();

export type OrdApiXyzGetInscriptionByAddress = yup.InferType<
  typeof ordApiXyzGetInscriptionByAddressSchema
>;
