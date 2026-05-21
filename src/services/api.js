import axios from 'axios';

const getDefaultApiBaseUrl = () => {
  if (typeof window === 'undefined') {
    return 'http://localhost:5000/api';
  }

  const { protocol, hostname } = window.location;
  return `${protocol}//${hostname}:5000/api`;
};

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || getDefaultApiBaseUrl(),
  headers: {
    'X-Kaypolls-Request': 'XMLHttpRequest'
  },
  withCredentials: true
});

export default api;
