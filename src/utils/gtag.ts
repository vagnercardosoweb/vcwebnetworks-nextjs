import configSocial from '@/config/social';

declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    gtag: any;
  }
}

type Event = {
  action: string;
  category: string;
  label: string;
  value?: string;
};

// https://developers.google.com/analytics/devguides/collection/gtagjs/pages
export const pageview = (): void => {
  if (!window.gtag) {
    return;
  }

  window.gtag('config', configSocial.google.trackingId, {
    page_path: window.location.pathname,
    page_location: window.location.pathname,
    page_title: document.title,
  });
};

// https://developers.google.com/analytics/devguides/collection/gtagjs/events
export const event = ({ action, category, label, value }: Event): void => {
  if (!window.gtag) {
    return;
  }

  window.gtag('event', action, {
    event_category: category,
    event_label: label,
    value,
  });
};
