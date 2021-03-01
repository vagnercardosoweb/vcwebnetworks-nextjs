/* eslint-disable react/no-danger */
import React from 'react';

const { NEXT_PUBLIC_GA_TRACKING_ID } = process.env;

const Analytics = (): JSX.Element => {
  if (!NEXT_PUBLIC_GA_TRACKING_ID) {
    return null;
  }

  return (
    <>
      <script async src={`https://www.googletagmanager.com/gtag/js?id=${NEXT_PUBLIC_GA_TRACKING_ID}`} />
      <script
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${NEXT_PUBLIC_GA_TRACKING_ID}', {
              page_path: window.location.pathname,
            });
          `,
        }}
      />
    </>
  );
};

export default Analytics;
