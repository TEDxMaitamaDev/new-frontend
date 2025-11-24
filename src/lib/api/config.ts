// API Configuration
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'https://server.tedxmaitama.com/api';
const API_KEY = process.env.NEXT_PUBLIC_API_KEY || '';

export const apiConfig = {
  baseURL: API_BASE_URL,
  apiKey: API_KEY,
  headers: {
    'Content-Type': 'application/json',
    'Authorization': API_KEY,
  },
};

export default apiConfig;

