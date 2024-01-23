import { getCookie, hasCookie, setCookie } from 'cookies-next';
import { ConsentCookie } from '../types';

/**
 * Assign dataLayer to the global window scope
 */
declare global {
  interface Window {
    dataLayer: Record<string, unknown>[];
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    gtag?: (...args: any) => void;
    goatcounter?: {
      count: () => void;
    };
  }
}

/**
 * Datalayer push helper
 */
export const pushToDataLayer = (
  event: string,
  data: Record<string, unknown>,
) => {
  window.dataLayer = window?.dataLayer || [];

  window.dataLayer.push({
    event,
    ...data,
  });
};

export const editCookieConsent = (consent: { analytics: boolean }) => {
  setCookie(ConsentCookie.Analytics, consent.analytics);

  window.gtag?.('consent', 'update', {
    analytics_storage: consent.analytics ? 'granted' : 'denied',
  });
};

export const initializeCookieConsent = () => {
  if (hasCookie(ConsentCookie.Analytics)) {
    editCookieConsent({
      analytics: !!getCookie(ConsentCookie.Analytics),
    });
  }
};
