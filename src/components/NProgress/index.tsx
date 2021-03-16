import { Router } from 'next/router';
import React, { useEffect } from 'react';

import { done, start } from 'nprogress';

import { pageview } from '@/utils/gtag';

import 'nprogress/nprogress.css';

const NProgress: React.FC = () => {
  useEffect(() => {
    Router.events.on('routeChangeError', done);
    Router.events.on('routeChangeStart', start);
    Router.events.on('routeChangeComplete', () => {
      done();
      pageview();
    });
  }, []);

  return null;
};

export default NProgress;
