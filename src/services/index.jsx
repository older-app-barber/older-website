import axios from 'axios';
import CryptoES from 'crypto-es';
import { toast } from 'sonner';

const createApiInstance = (baseURL) => {
  const instance = axios.create({
    baseURL,
    timeout: 10000,
    headers: { 'Content-Type': 'application/json' },
  });

  const generateHmac = (config) => {
    const { method, path, timestamp, body, secret } = config
    const message = `${method.toUpperCase()}${path}${timestamp}${body}`
    return CryptoES.HmacSHA256(message, secret).toString(CryptoES.enc.Hex)
  };

  const hmacSignature = (config) => {
    const token = localStorage.getItem("authToken")
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`
    }

    const timestamp = Date.now().toString();
    const method = config.method?.toUpperCase() || 'GET'

    const baseUrl = new URL(config.baseURL || '')
    const fullUrl = new URL(config.url || '', baseUrl)
    let path

    if (config.params) {
      const queryParams = Object.keys(config.params)
          .map((key) => `${key}=${config.params[key]}`)
          .join('&');
      path = `${fullUrl.pathname}${queryParams ? '?' + queryParams : ''}`
    } else {
      path = fullUrl.pathname;
    }

    const body = method === 'GET' || method === 'DELETE'
        ? ''
        : config.data && Object.keys(config.data).length > 0
            ? JSON.stringify(config.data)
            : '';

    const secrets = {
      method,
      path,
      body,
      timestamp,
      secret: import.meta.env.VITE_API_SECRET,
    }

    const signature = generateHmac(secrets)

    if (config.headers) {
      config.headers['x-api-key'] = import.meta.env.VITE_API_KEY
      config.headers['x-api-timestamp'] = timestamp
      config.headers['x-api-signature'] = signature.toLowerCase()
    }

    return config
  }

  const handleResponseError = async (error) => {
    const status = error.response?.status;
    const data = error.response?.data || error.message;

    if (status === 401) {
      return Promise.reject(error);
    }

    if (data) {
      // const message = typeof data === 'object' && 'message' in data
      //     ? data.message.toString()
      //     : data.toString();

      // toast.error(message, { className: 'soft-color' });
      return Promise.reject(data);
    }

    toast.error('Algo deu errado. Tente novamente.', {
      className: 'soft-color',
    })

    return Promise.reject('Something went wrong');
  }

  instance.interceptors.request.use(hmacSignature);
  instance.interceptors.response.use(
      (response) => response,
      (error) => {
        console.error('[RESPONSE ERROR]', error.message);
        return handleResponseError(error);
      }
  )

  return instance
}

const api = createApiInstance(import.meta.env.VITE_API_URL )
const sharedApi = createApiInstance(import.meta.env.VITE_SHARED_API_URL )

export { api, sharedApi }