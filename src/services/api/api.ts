import axios from 'axios';

interface TestResponse {
  // expected response type here
  message: string;
}

const API_BASE_URL = 'http://localhost:3000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const apiService = {
  test: () => api.get<TestResponse>('/courses').then((response) => response.data),
};
