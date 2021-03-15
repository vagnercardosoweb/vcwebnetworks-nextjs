import { AppProps } from 'next/app';
import Head from 'next/head';
import React from 'react';

import NProgress from '@/components/NProgress';
import SEO from '@/components/SEO';
import configClient from '@/config/client';
import { ThemeProvider } from '@/contexts/theme';
import GlobalStyles from '@/styles/global';
import { ThemeMode } from '@/styles/styled';
import theme from '@/styles/theme';

interface Props extends AppProps {
  theme: { mode: ThemeMode };
}

const App: React.FC<Props> = ({ Component, pageProps }) => {
  return (
    <ThemeProvider>
      <Head>
        <meta charSet="UTF-8" />
        <meta httpEquiv="x-ua-compatible" content="IE=edge,chrome=1" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />

        {configClient.baseUrl() && (
          <link rel="base" href={configClient.baseUrl()} />
        )}

        {theme.colors.primary && (
          <>
            <meta name="theme-color" content={theme.colors.primary} />
            <meta
              name="msapplication-TileColor"
              content={theme.colors.primary}
            />
          </>
        )}
      </Head>

      <SEO />
      <GlobalStyles />
      <NProgress />
      <Component {...pageProps} />
    </ThemeProvider>
  );
};

export default App;
