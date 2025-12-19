import React from 'react';
import ReactDOM from 'react-dom/client';

import { validateEnv } from '@utils/env-validator';

import { App } from './app';

// Validate environment variables before app initialization
try {
  validateEnv();
} catch (error) {
  console.error('Failed to initialize app due to environment validation errors');
  throw error;
}

// Ensures `BigInt`s don't throw errors when using `JSON.stringify`, as they are not supported by
// the `stringify` function.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
(BigInt.prototype as any).toJSON = function () {
  return this.toString();
};

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
