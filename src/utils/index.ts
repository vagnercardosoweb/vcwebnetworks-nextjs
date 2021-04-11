import { NextApiResponse } from 'next';
import { NextRouter } from 'next/router';

export const isRouterReady = (router: NextRouter): boolean =>
  router.asPath !== router.route;

export const serverRedirect = (
  response: NextApiResponse,
  url: string,
  status: `permanent` | `temporary`,
): void => {
  response.setHeader(`location`, url);
  response.statusCode = status === `permanent` ? 301 : 302;
  response.end();
};

export const formattedMoney = (
  value: number | string,
  options?: Intl.NumberFormatOptions,
): string => {
  const defaultOptions = {
    style: 'currency',
    currency: 'BRL',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  } as Intl.NumberFormatOptions;

  const formatter = Intl.NumberFormat('pt-BR', {
    ...defaultOptions,
    ...(options ?? {}),
  });

  return formatter.format(value as number);
};

export const normalizeMoney = (value: string): number =>
  Number(value.replace(/[^0-9-]/g, '')) / 100;

export const formattedDate = (
  date: number | Date | string | undefined,
  options?: Intl.DateTimeFormatOptions,
): string => {
  const defaultOptions = {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    timeZone: 'America/Sao_Paulo',
  } as Intl.DateTimeFormatOptions;

  const formatter = Intl.DateTimeFormat('pr-BR', {
    ...defaultOptions,
    ...(options ?? {}),
  });

  return formatter.format(typeof date === 'string' ? new Date(date) : date);
};

export const bytesToSize = (bytes: number, decimals = 2): string => {
  if (bytes === 0) {
    return '0 Bytes';
  }

  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return `${parseFloat((bytes / k ** i).toFixed(dm))} ${sizes[i]}`;
};

export const parseJSON = (
  json: string | null,
): boolean | Record<string, never> => {
  if (typeof json !== 'string') {
    json = JSON.stringify(json);
  }

  try {
    json = JSON.parse(json);
  } catch (e) {
    return false;
  }

  if (typeof json === 'object' && json !== null) {
    return json;
  }

  return false;
};

export const normalizeInternalLink = (link: string): string => {
  if (link.startsWith(`/`)) {
    return link;
  }

  return `/${link}`;
};

type ClipboardCallback = (text: string) => void;

export const clipboard = (text: string, callback?: ClipboardCallback): void => {
  const textArea = document.createElement('textarea');

  textArea.innerText = text;
  document.body.appendChild(textArea);
  textArea.select();
  document.execCommand('copy');
  textArea.remove();

  if (typeof callback === 'function') {
    callback(text);
  }
};

export const formatMask = (value: string, mask: string): string => {
  let maskedValue = '';
  let maskedIndex = 0;

  // eslint-disable-next-line no-useless-escape
  const unmasked = value.replace(/[\-\|\(\)\/\.\: ]/gm, '');
  const valueLength = unmasked.length;
  const maskLength = mask.replace(/[^#]/gm, '').length;

  if (valueLength > maskLength || maskLength > valueLength) {
    return value || '';
  }

  for (let i = 0; i < String(mask).length; i += 1) {
    if (mask[i] === '#' && typeof unmasked[maskedIndex] !== 'undefined') {
      maskedValue += unmasked[maskedIndex];
      maskedIndex += 1;
    } else if (typeof mask[i] !== 'undefined') {
      maskedValue += mask[i];
    }
  }

  return maskedValue;
};

export const formatCpf = (value: string): string =>
  formatMask(value, '###.###.###-##');

export const sleep = (ms = 0): Promise<unknown> =>
  new Promise(resolve => setTimeout(() => resolve, ms));

export const strLimit = (value: string, limit?: number, endLine?: '...') => {
  const strLength = value.replace(/\s/g, '').length;

  if (limit && strLength > limit) {
    return value.substring(0, limit) + endLine;
  }

  return value;
};

export function ucFirst(value: string): string {
  return value.charAt(0).toUpperCase() + value.slice(1);
}

export const createUrlSearchParams = (
  params: Record<string, any>,
  mapperParams: Record<string, any> = {},
): URLSearchParams => {
  const urlSearchParams = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value) {
      let parseKey = key;

      if (key in mapperParams) {
        parseKey = mapperParams[key];
      }

      urlSearchParams.append(parseKey, `${value}`);
    }
  });

  return urlSearchParams;
};
