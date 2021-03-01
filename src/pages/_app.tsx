import { AppProps } from 'next/app';
import Head from 'next/head';
import { useRouter } from 'next/router';
import React, { useCallback, useEffect } from 'react';

import NProgress from 'nprogress';
import { ThemeProvider } from 'styled-components';

import SEO from '@/components/SEO';
import configClient from '@/config/client';
import GlobalStyles from '@/styles/global';
import theme from '@/styles/theme';
import * as gtag from '@/utils/gtag';

const App: React.FC<AppProps> = ({ Component, pageProps }) => {
  const router = useRouter();

  const routeChangeStart = useCallback(() => NProgress.start(), []);
  const routeChangeError = useCallback(() => NProgress.done(), []);

  const routeChangeComplete = useCallback(() => {
    NProgress.done();
    gtag.pageview();
  }, []);

  useEffect(() => {
    router.events.on('routeChangeStart', routeChangeStart);
    router.events.on('routeChangeError', routeChangeStart);
    router.events.on('routeChangeComplete', routeChangeStart);

    return () => {
      router.events.off('routeChangeStart', routeChangeStart);
      router.events.off('routeChangeError', routeChangeError);
      router.events.off('routeChangeComplete', routeChangeComplete);
    };
  }, [routeChangeComplete, routeChangeError, routeChangeStart, router.events]);

  return (
    <ThemeProvider theme={theme}>
      <Head>
        <meta charSet="UTF-8" />
        <meta httpEquiv="x-ua-compatible" content="IE=edge,chrome=1" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />

        {configClient.baseUrl() && <link rel="base" href={configClient.baseUrl()} />}

        {theme.colors.primary && (
          <>
            <meta name="theme-color" content={theme.colors.primary} />
            <meta name="msapplication-TileColor" content={theme.colors.primary} />
          </>
        )}
      </Head>

      <SEO />
      <GlobalStyles />
      <Component {...pageProps} />
    </ThemeProvider>
  );
};

export default App;
