export function setupLeatherFetchInterceptor() {
  const originalFetch = window.fetch;

  window.fetch = async function (input: RequestInfo | URL, init?: RequestInit) {
    const url = input instanceof URL ? input.toString() : input.toString();

    if (url.includes('hiro.so')) {
      const modifiedInit = {
        ...init,
        headers: {
          ...init?.headers,
          'x-hiro-product': 'Leather',
        },
      };
      return await originalFetch(input, modifiedInit);
    }

    return await originalFetch(input, init);
  };
}
