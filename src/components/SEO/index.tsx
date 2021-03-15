import { NextSeo } from 'next-seo';
import { MetaTag } from 'next-seo/lib/types';
import { useRouter } from 'next/router';
import React from 'react';

import configClient from '@/config/client';

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

  const pageUrl = url ?? `${configClient.baseUrl()}${router.asPath}`;
  let pageTitle = title ?? configClient.title;
  let pageImage = image ?? configClient.seoImage;
  const pageDescription = description ?? configClient.description;
  const pageTwitterCreator = twitterCreator ?? configClient.twitter.creator;
  const pageTwitterSite = twitterSite ?? configClient.twitter.site;

  if (!pageImage.match(/http?s:\/\//g)) {
    pageImage = `${pageUrl}${pageImage}`;
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
  ];

  if (pageImage) {
    additionalMetaTags.push({
      name: 'image',
      content: pageImage,
    });
  }

  if (router.route === '/404') {
    pageTitle = 'Página não encontrada.';
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
