import { AppProps } from 'next/app';
import Head from 'next/head';
import React from 'react';

import NProgress from '@/components/NProgress';
import SEO from '@/components/SEO';
import configClient from '@/config/client';
import { ThemeProvider } from '@/contexts/theme';
import theme from '@/styles/theme';

const App: React.FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <ThemeProvider>
      <Head>
        <meta charSet="UTF-8" />
        <meta httpEquiv="x-ua-compatible" content="IE=edge,chrome=1" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />

        {configClient.baseUrl() && (
          <link rel="base" href={configClient.baseUrl()} />
        )}

        {theme.color.primary && (
          <>
            <meta name="theme-color" content={theme.color.primary} />
            <meta
              name="msapplication-TileColor"
              content={theme.color.primary}
            />
          </>
        )}
      </Head>

      <SEO />
      <NProgress />
      <Component {...pageProps} />
    </ThemeProvider>
  );
};

export default App;
