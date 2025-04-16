export async function fetchFn(input: RequestInfo | URL, init?: RequestInit) {
  const url = input instanceof URL ? input.toString() : input.toString();

  const finalInit = url.includes('hiro.so')
    ? {
        ...init,
        headers: {
          ...init?.headers,
          'x-partner': 'Leather',
        },
      }
    : init;

  return await fetch(input, finalInit);
}
