const configCommon = {
  seoImage: '/images/seo.png',

  url: (path?: string): string => {
    const url = process.env.NEXT_PUBLIC_BASE_URL ?? 'http://localhost:3000';

    return `${url}${path ?? ''}`;
  },
};

export default configCommon;
