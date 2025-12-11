import 'server-only';

import { Flotiq } from '@flotiq/flotiq-api-sdk';
import { createNextMiddleware } from '@flotiq/nextjs-addon';
import { createNextLivePreviewMiddleware } from '@flotiq/nextjs-live-preview';

if (!process.env.FLOTIQ_API_KEY) {
  throw new Error(
    "FLOTIQ_API_KEY is required to access the blogpost data. Check env variable section in README for more information",
  );
}

export const flotiqApiClient = new Flotiq({
  apiKey: process.env.FLOTIQ_API_KEY,

  middleware: [createNextMiddleware(), createNextLivePreviewMiddleware()],
});

export const content = flotiqApiClient.content;
export const search = flotiqApiClient.search;
export const helpers = flotiqApiClient.helpers;
