import Router from 'next/router';
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';

import { destroyCookie, parseCookies, setCookie } from 'nookies';

import { api } from '@/services/api';

export interface IAuthContext {
  clientData?: any;
  isAuthenticated: boolean;
  handleLogin: (payload: any) => Promise<void>;
  handleRegister: (payload: any) => Promise<void>;
  handleLogout: () => void;
}

export const AuthContext = createContext({} as IAuthContext);

export const AuthProvider = ({ children }) => {
  const [client, setClient] = useState<IAuthContext['clientData']>(null);

  const registerCookie = useCallback((token: string) => {
    setCookie(null, 'token', token, {
      path: '/',
      maxAge: 60 * 60 * 24 * 7, // 7 days
    });

    api.defaults.headers.authorization = `Bearer ${token}`;
  }, []);

  const handleLogin = useCallback(
    async (payload: any) => {
      const response = await api.post<any>('{login-url}', payload);

      registerCookie(response.data.token);
      setClient(response.data.client);
    },
    [registerCookie],
  );

  const handleRegister = useCallback(
    async (payload: any) => {
      const response = await api.post<any>('{register-url}', payload);

      registerCookie(response.data.token);
      setClient(response.data.client);
    },
    [registerCookie],
  );

  const handleLogout = useCallback(async () => {
    setClient(() => {
      destroyCookie(null, 'token');

      return null;
    });

    await Router.push('/');
  }, []);

  const providerValue = useMemo(
    () => ({
      handleLogin,
      handleRegister,
      handleLogout,
      isAuthenticated: !!client,
      clientData: client,
    }),
    [client, handleLogin, handleLogout, handleRegister],
  );

  useEffect(() => {
    (async () => {
      try {
        const { token: cookieToken } = parseCookies();

        if (cookieToken) {
          api.defaults.headers.authorization = `Bearer ${cookieToken}`;
          const response = await api.get<any>('{me-url}');
          setClient(response.data);
        }
      } catch {
        setClient(null);
      }
    })();
  }, []);

  return (
    <AuthContext.Provider value={providerValue}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
