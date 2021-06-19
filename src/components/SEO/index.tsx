import { NextSeo } from 'next-seo';
import { MetaTag } from 'next-seo/lib/types';
import { useRouter } from 'next/router';
import React from 'react';

import configCommon from '@/config';
import configClient from '@/config/client';
import configSocial from '@/config/social';

export interface ISeoProps {
  title?: string;
  description?: string;
  image?: string;
  shouldIndexPage?: boolean;
  twitterSite?: string;
  twitterCreator?: string;
  url?: string;
}

const SEO: React.FC<ISeoProps> = ({
  title,
  description,
  image,
  shouldIndexPage = true,
  twitterCreator,
  twitterSite,
  url,
}) => {
  const router = useRouter();

  if (router.route === '/404') {
    title = 'Página não encontrada';
  }

  if (router.route === '/500') {
    title = 'Erro interno';
  }

  const pageUrl = configCommon.url(url ?? router.asPath).trim();
  const pageTitle = `${title ? `${title} - ` : ''}${configClient.title}`.trim();
  const pageDescription = description ?? configClient.description;
  const pageTwitterCreator = twitterCreator ?? configSocial.twitter.creator;
  const pageTwitterSite = twitterSite ?? configSocial.twitter.site;

  let pageImage = image ?? configCommon.seoImage;

  if (!pageImage.match(/http?s:\/\//g)) {
    pageImage = `${pageUrl}${pageImage.substr(1)}`;
  }

  const additionalMetaTags: MetaTag[] = [
    {
      name: 'referrer',
      content: 'no-referrer-when-downgrade',
    },
    {
      name: 'google',
      content: 'notranslate',
    },
    {
      name: 'MobileOptimized',
      content: '320',
    },
    {
      name: 'HandheldFriendly',
      content: 'True',
    },
    {
      property: 'fb:pages',
      content: configSocial.facebook.pageId,
    },
  ];

  if (pageImage) {
    additionalMetaTags.push({
      name: 'image',
      content: pageImage,
    });
  }

  return (
    <NextSeo
      title={pageTitle}
      defaultTitle={configClient.title}
      canonical={pageUrl}
      description={pageDescription}
      nofollow={!shouldIndexPage}
      noindex={!shouldIndexPage}
      additionalMetaTags={additionalMetaTags}
      facebook={{ appId: configSocial.facebook.appId }}
      openGraph={{
        title: pageTitle,
        description: pageDescription,
        url: pageUrl,
        locale: 'pt_BR',
        type: 'website',
        site_name: pageTitle,
        images: pageImage
          ? [
              {
                url: pageImage,
                alt: 'Thumbnail',
                height: 630,
                width: 1200,
              },
            ]
          : [],
      }}
      twitter={{
        cardType: 'summary_large_image',
        handle: pageTwitterCreator,
        site: pageTwitterSite,
      }}
    />
  );
};

export default SEO;
