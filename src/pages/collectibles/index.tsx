import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import {
  isPayload,
  ordApiXyzGetInscriptionByAddressSchema,
  Payload,
} from "./types";

function parsePayload(o: string): null | Object {
  try {
    return JSON.parse(atob(o));
  } catch {
    return null;
  }
}

export function Collectibles() {
  const params = useParams<"payload">();

  // const mockPayload: Payload = {
  //   stxAddresses: ["ST1", "ST2"],
  //   btcAddresses: [
  //     "bc1p527kv6mrq2sn5l7ukapq4q4a4puqfd9jsm7fv6r06c5726kyk57qnfvs4e",
  //   ],
  // };

  if (!params.payload) {
    return <p>No collectibles info provided.</p>;
  }

  const parsedPayload = parsePayload(params.payload);

  if (!isPayload(parsedPayload)) {
    return <p>Invalid collectibles data provided.</p>;
  }

  return <CollectiblesLayout payload={parsedPayload} />;
}

interface Props {
  payload: Payload;
}

function CollectiblesLayout(props: Props) {
  // const q1 = useQuery(
  //   ["stacks-nfts", props.payload.stxAddresses] as const,
  //   async ({ queryKey }) => {
  //     const [_, addresses] = queryKey;
  //     console.log(addresses);
  //     // TODO
  //     return null;
  //   }
  // );
  const q2 = useQuery(
    ["ordinals", props.payload.btcAddresses] as const,
    async ({ queryKey }) => {
      const [_, addresses] = queryKey;

      if (!addresses) return [];

      const responsesOrdApi = await Promise.all(
        addresses.map((address) =>
          fetch(`https://ordapi.xyz/address/${address}`)
        )
      );

      const parsedResponses = await Promise.all(
        responsesOrdApi.map((v) => v.json())
      );

      const imageUrls = parsedResponses
        .map((resData) => {
          const validatedResData =
            ordApiXyzGetInscriptionByAddressSchema.validateSync(resData);

          const images = validatedResData.filter((entry) => {
            return ["image/webp", "image/jpeg"].includes(entry["content type"]);
          });

          return images.map((i) => `https://ordinals.com${i.content}`);
        })
        .flat();

      return imageUrls;
    }
  );
  return (
    <>
      <h1>Welcome to my Bitcoin web3 gallery</h1>
      <div>{q2.data && q2.data.map((url) => <img src={url} key={url} />)}</div>
    </>
  );
}
