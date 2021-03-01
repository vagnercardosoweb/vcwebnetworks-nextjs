const configClient = {
  title: 'Skeleton NextJS',
  subtitle: '',
  description: '',

  seoImage: '/images/seo',

  twitter: {
    creator: '@vcwebnetworks',
    site: '@vcwebnetworks',
  },

  baseUrl: (): string => {
    let baseUrl = '';

    if (typeof window !== 'undefined') {
      baseUrl = `${window.location.protocol}//${window.location.host}`;
    }

    return baseUrl;
  },
};

export default configClient;
