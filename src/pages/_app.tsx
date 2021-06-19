import { AppProps } from 'next/app';
import Head from 'next/head';
import React, { StrictMode } from 'react';

import NProgress from '@/components/NProgress';
import SEO from '@/components/SEO';
import configCommon from '@/config';
import { ThemeProvider } from '@/contexts/theme';
import theme from '@/styles/theme';

const App: React.FC<AppProps> = ({ Component, pageProps }) => (
  <StrictMode>
    <ThemeProvider>
      <Head>
        <meta charSet="UTF-8" />
        <meta httpEquiv="x-ua-compatible" content="IE=edge,chrome=1" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />

        <link rel="base" href={configCommon.url()} />

        {theme.color.primary && (
          <>
            <meta name="theme-color" content={theme.color.primary} />
            <meta
              name="msapplication-TileColor"
              content={theme.color.primary}
            />
          </>
        )}

        <link rel="shortcut icon" href="/images/icon-512x512.png" />
        <link rel="apple-touch-icon" href="/images/icon-512x512.png" />
        <link rel="manifest" href="/manifest.json" />
      </Head>

      <SEO />
      <NProgress />
      <Component {...pageProps} />
    </ThemeProvider>
  </StrictMode>
);

export default App;
