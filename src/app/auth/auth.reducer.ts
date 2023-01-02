import { createReducer, on } from '@ngrx/store';
import {
  AuthFailure,
  AuthSuccess,
  CreateUserFailure,
  CreateUserSuccess,
  GetUsersFailure,
  GetUsersSuccess,
  LogoutFailure,
  LogoutSuccess,
} from './auth.actions';
import { User } from './auth.model';

export interface AuthState {
  isAuthenticated: boolean;
  uid: string | null;
  users: User[];
  error: Error | null;
}

const INITIAL_STATE: Readonly<AuthState> = {
  isAuthenticated: false,
  uid: null,
  users: [],
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
  }),
  on(CreateUserSuccess, (state) => {
    return { ...state, error: null };
  }),
  on(CreateUserFailure, (state, { error }) => {
    return { ...state, error: error };
  }),
  on(GetUsersSuccess, (state, { users }) => {
    return { ...state, users: users, error: null };
  }),
  on(GetUsersFailure, (state, { error }) => {
    return { ...state, error: error };
  })
);
