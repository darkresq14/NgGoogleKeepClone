import { createReducer, on } from '@ngrx/store';
import {
  AuthFailure,
  AuthSuccess,
  LogoutFailure,
  LogoutSuccess,
} from './auth.actions';

export interface AuthState {
  isAuthenticated: boolean;
  uid: string | null;
  error: Error | null;
}

const INITIAL_STATE: Readonly<AuthState> = {
  isAuthenticated: false,
  uid: null,
  error: null,
};

export const authReducer = createReducer(
  INITIAL_STATE,
  on(AuthSuccess, (state, { uid }) => {
    return { ...state, isAuthenticated: true, uid: uid, error: null };
  }),
  on(AuthFailure, (state, { error }) => {
    return { ...state, isAuthenticated: false, uid: null, error: error };
  }),
  on(LogoutSuccess, (state) => {
    return { ...state, isAuthenticated: false, uid: null, error: null };
  }),
  on(LogoutFailure, (state, { error }) => {
    return { ...state, isAuthenticated: false, uid: null, error: error };
  })
);
