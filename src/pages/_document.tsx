import Document, {
  DocumentContext,
  Head,
  Html,
  Main,
  NextScript,
} from 'next/document';
import React from 'react';

import { ServerStyleSheet } from 'styled-components';

import Analytics from '@/components/Analytics';

interface IResponse {
  styles: JSX.Element;
  html: string;
  head?: JSX.Element[];
}

export default class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext): Promise<IResponse> {
    const sheet = new ServerStyleSheet();
    const originalRenderPage = ctx.renderPage;

    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: App => props => sheet.collectStyles(<App {...props} />),
        });

      const initialProps = await Document.getInitialProps(ctx);

      return {
        ...initialProps,
        styles: (
          <>
            {initialProps.styles}
            {sheet.getStyleElement()}
          </>
        ),
      };
    } finally {
      sheet.seal();
    }
  }

  render(): JSX.Element {
    return (
      <Html lang="pt-br">
        <Head>
          <link rel="preconnect" href="https://fonts.gstatic.com" />
          <link
            href="https://fonts.googleapis.com/css2?family=Poppins:wght@100;400;500;700&display=swap"
            rel="stylesheet"
          />

          {/* Blog load embeds socials */}
          {/* <script async src="https://www.instagram.com/embed.js" />
           <script async src="https://platform.twitter.com/widgets.js" /> */}
        </Head>
        <body>
          <Main />
          <NextScript />
          <Analytics />
        </body>
      </Html>
    );
  }
}
