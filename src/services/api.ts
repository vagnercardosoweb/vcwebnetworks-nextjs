import { GetServerSidePropsContext } from 'next';
import Router from 'next/router';

import axios, { AxiosError, AxiosRequestConfig } from 'axios';
import { destroyCookie, parseCookies } from 'nookies';

import { serverRedirect, showAlert } from '@/utils';

export const makeApi = (
  nextContext?: GetServerSidePropsContext,
  axiosOptions?: AxiosRequestConfig,
) => {
  const client = axios.create({
    ...(axiosOptions ?? {}),
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    headers: {
      ...(axiosOptions?.headers ?? {}),
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_BASE_TOKEN}`,
    },
  });

  client.interceptors.request.use(
    (config: AxiosRequestConfig) => {
      if (process.env.NEXT_PUBLIC_API_METHOD_OVERRIDE === 'true') {
        const method = config.method?.toUpperCase();
        config.headers['X-Http-Method-Override'] = method;

        if (['PUT', 'DELETE', 'PATCH'].includes(method as string)) {
          config.method = 'POST';
        }
      }

      const { token } = parseCookies(nextContext);

      if (token?.trim().length > 0) {
        config.headers.Authorization = `Bearer ${token}`;
      }

      return config;
    },
    error => error,
  );

  client.interceptors.response.use(
    response => response,
    async (error: AxiosError) => {
      if (!nextContext && error?.response?.data?.error) {
        const { message } = error?.response?.data?.error;
        showAlert(message);
      }

      if (error?.response?.status === 401) {
        destroyCookie(nextContext, 'token');

        if (nextContext) {
          serverRedirect(nextContext.res, '/{login-form}', 'temporary');
        } else {
          await Router.push('/{login-form}');
        }
      }

      return Promise.reject(error);
    },
  );

  return client;
};

export const api = makeApi();
