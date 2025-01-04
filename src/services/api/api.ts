import type { UploadResponse } from '@/types/api';
import axios, { type CancelToken } from 'axios';

const API_BASE_URL = 'http://localhost:3000/api';

interface TestResponse {
  // expected response type here
  message: string;
}
interface UploadConfig {
  onUploadProgress?: (progressEvent: { loaded: number; total?: number }) => void;
  cancelToken?: CancelToken;
}

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const apiService = {
  test: () => api.get<TestResponse>('/courses').then((response) => response.data),
  uploadPdf: (file: File, config?: UploadConfig) => {
    const formData = new FormData();
    formData.append('file', file);

    return api
      .post<UploadResponse>('/upload/pdf', formData, {
        ...config,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((response) => response.data);
  },
};
