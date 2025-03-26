import api from './axios';
import { AuthResponse } from '../types';

export const login = async (email: string, password: string) => {
  const response = await api.post<AuthResponse>('/login', {
    user: { email, password }
  });

  // JWTトークンを取得してローカルストレージに保存
  if (response.data.token) {
    localStorage.setItem('token', response.data.token);
  } else if (response.headers.authorization) {
    const token = response.headers.authorization.replace('Bearer ', '');
    localStorage.setItem('token', token);
  }

  return response.data;
};

export const register = async (name: string, email: string, password: string, passwordConfirmation: string) => {
  const response = await api.post<AuthResponse>('/signup', {
    user: { name, email, password, password_confirmation: passwordConfirmation }
  });

  // JWTトークンを取得してローカルストレージに保存
  if (response.data.token) {
    localStorage.setItem('token', response.data.token);
  } else if (response.headers.authorization) {
    const token = response.headers.authorization.replace('Bearer ', '');
    localStorage.setItem('token', token);
  }

  return response.data;
};

export const logout = async () => {
  const response = await api.delete('/logout');
  localStorage.removeItem('token');
  return response.data;
};

