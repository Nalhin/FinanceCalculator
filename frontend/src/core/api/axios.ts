import defaultAxios from 'axios';
import { cookies } from '../../shared/models/cookies/app-cookies';

const instance = defaultAxios.create({ baseURL: '/api' });

instance.interceptors.request.use((config) => {
  const authCookie = cookies.getAuthCookie();
  if (authCookie) {
    config.headers.Authorization = `Bearer ${authCookie}`;
  }
  return config;
});

export { instance as axios };
