import packageJson from '../package.json';

export const MICROBLOCKS_ENABLED = true;

export const IS_BROWSER = typeof document !== 'undefined';

export const DEFAULT_V2_INFO_ENDPOINT = '/v2/info';

export const APP_DETAILS =
  typeof window !== 'undefined'
    ? {
        name: 'Leather Earn',
        icon: `${window.location.origin}/logo.svg`,
      }
    : {
        name: 'Leather Earn - Testing',
        icon: `/logo.svg`,
      };

export const X_API_KEY = '';

export const DEFAULT_MAINNET_SERVER = 'https://api.hiro.so';

export const DEFAULT_TESTNET_SERVER = 'https://api.testnet.hiro.so';

export const DEFAULT_DEVNET_SERVER = 'http://localhost:3999';

export const NAKA_TESTNET_SERVER = 'https://api.nakamoto.testnet.hiro.so';

export const VERSION = packageJson.version;
