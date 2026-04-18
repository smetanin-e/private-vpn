import axios from 'axios';

export const clientAxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

// Добавляем интерсептор, который работает и на клиенте и на сервере
clientAxiosInstance.interceptors.request.use((config) => {
  // Используем серверный токен на сервере, клиентский на клиенте
  const token =
    typeof window !== 'undefined' ? process.env.NEXT_PUBLIC_API_READ_KEY : process.env.API_READ_KEY;

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

// Для серверных запросов (в API routes)
export const serverAxiosInstance = axios.create({
  baseURL: process.env.API_URL_SERVER,
});
