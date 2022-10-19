import { createReducer, on } from '@ngrx/store';
import { setAuthenticated, setUnauthenticated } from './auth.actions';

export interface AuthState {
  isAuthenticated: boolean;
}

const INITIAL_STATE = {
  isAuthenticated: false,
};

export const authReducer = createReducer(
  INITIAL_STATE,
  on(setAuthenticated, (state) => {
    return { ...state, isAuthenticated: true };
  }),
  on(setUnauthenticated, (state) => {
    return { ...state, isAuthenticated: false };
  })
);
