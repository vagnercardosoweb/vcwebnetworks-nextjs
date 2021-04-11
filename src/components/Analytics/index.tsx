/* eslint-disable react/no-danger */
import React from 'react';

import configSocial from '@/config/social';

const Analytics = (): JSX.Element => {
  if (!configSocial.google.trackingId) {
    return null;
  }

  return (
    <>
      <script
        async
        src={`https://www.googletagmanager.com/gtag/js?id=${configSocial.google.trackingId}`}
      />

      <script
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${configSocial.google.trackingId}', {
              page_path: window.location.pathname,
            });
          `,
        }}
      />
    </>
  );
};

export default Analytics;
