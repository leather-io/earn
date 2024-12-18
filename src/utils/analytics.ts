import { configureAnalyticsClient } from '@leather.io/analytics';
import { AnalyticsBrowser } from '@segment/analytics-next';

const segmentClient = new AnalyticsBrowser();

export const analytics = configureAnalyticsClient<AnalyticsBrowser>({
  client: segmentClient,
  defaultProperties: {
    platform: 'web',
  },
});

export function initAnalytics() {
  if (!import.meta.env.VITE_SEGMENT_WRITE_KEY) {
    console.log('No Segment write key found');
    return;
  }

  return analytics.client.load(
    { writeKey: import.meta.env.VITE_SEGMENT_WRITE_KEY ?? '' },
    {
      integrations: {
        'Segment.io': {
          deliveryStrategy: {
            strategy: 'batching',
            config: {
              size: 10,
              timeout: 5000,
            },
          },
        },
      },
    }
  );
}
