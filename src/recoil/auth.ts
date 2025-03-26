import { atom, selector } from 'recoil';
import { User } from '../types';

export const authTokenState = atom<string | null>({
  key: 'authTokenState',
  default: localStorage.getItem('token'),
});

export const currentUserState = atom<User | null>({
  key: 'currentUserState',
  default: null,
});

export const isAuthenticatedState = selector({
  key: 'isAuthenticatedState',
  get: ({ get }) => {
    const token = get(authTokenState);
    return !!token;
  }
});
