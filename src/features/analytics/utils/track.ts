import { useSettingsStore } from '@features/settings';
import { AnalyticsEvent, CardCreatorAnalyticsEvent } from '../types';
import createTrackCard from './createTrackCard';
import { pushToDataLayer } from './dataLayer';

export const trackCardCreatorEvent = (
  event: CardCreatorAnalyticsEvent,
  data?: Record<string, string>,
) => {
  setTimeout(() => {
    const card = createTrackCard();
    const { theme } = useSettingsStore.getState();

    pushToDataLayer(event, {
      card,
      theme,
      ...data,
    });
  }, 1000);
};

export const trackEvent = (
  event: AnalyticsEvent,
  data?: Record<string, string>,
) => {
  pushToDataLayer(event, { ...data });
};
