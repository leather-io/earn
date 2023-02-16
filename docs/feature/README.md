# Feature Documentation

## Displaying Stacks NFTs and Ordinals

This is an unstable feature that is still a work in progress. Using [Ordinals support][ordinals-support-notion] and [this Github issue][gh-issue] as guidance.

### App Architecture

Users can navigate to `/collectibles/<json-base64>` to see the NFTs and Ordinals referenced by the JSON data. The schema for the JSON data is,

```json
{
  "$schema": "https://json-schema.org/draft/2020-12/schema",

  "type": "object",
  "properties": {
    "stxAddresses": {
      "type": "array",
      "items": {
        "type": "string"
      },
      "uniqueItems": true
    },
    "btcAddresses": {
      "type": "array",
      "items": {
        "type": "string"
      },
      "uniqueItems": true
    }
  },
  "additionalProperties": false
}
```

Using [`yup`][yup-github], the above schema can be represented as,

```typescript
const payloadSchema = yup.object({
  stxAddresses: yup.array(yup.string().required()),
  btcAddresses: yup.array(yup.string().required()),
});

export interface Payload extends yup.InferType<typeof payloadSchema> {
  // using interface instead of type generally gives nicer editor feedback
}
```

An example of a valid object is,

```json
{
  "stxAddresses": ["SP1234", "SPABCD"],
  "btcAddresses": ["tb1001", "tb1002", "tb1003"]
}
```

TODO: example how to convert JSON to and from base64 string.

### Security

Ordinals may contain arbitrary data. As such, the app will only display images.

### API Endpoints

Ordinals:

- https://ordapi.xyz/
- https://ordinals.com/content/<asset-hash>

Stacks NFTs: TODO: review below links

- https://github.com/hirosystems/token-metadata-service#api-reference
- https://api.hiro.so/metadata/nft/SPNWZ5V2TPWGQGVDR6T7B6RQ4XMGZ4PXTEE0VQ0S.satoshis-team/12200
- https://token-metadata-service-pbcblockstack-blockstack.vercel.app/

[ordinals-support-notion]: https://www.notion.so/trustmachines/Ordinals-support-0469c5cb4ad14b1e8df303981993c749#f3f8267d12ee4f038212c3384f37da6c
[gh-issue]: https://github.com/hirosystems/btcweb3/issues/10
[yup-github]: https://github.com/jquense/yup
