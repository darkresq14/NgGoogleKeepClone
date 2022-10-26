import { createReducer, on } from '@ngrx/store';
import {
  // LoginStart,
  setAuthenticated,
  setUid,
  setUnauthenticated,
} from './auth.actions';

export interface AuthState {
  isAuthenticated: boolean;
  uid: string | null;
}

const INITIAL_STATE: Readonly<AuthState> = {
  isAuthenticated: false,
  uid: null,
};
//TODO: merge auth actions
export const authReducer = createReducer(
  INITIAL_STATE,
  on(setAuthenticated, (state) => {
    return { ...state, isAuthenticated: true };
  }),
  on(setUnauthenticated, (state) => {
    return { ...state, isAuthenticated: false };
  }),
  on(setUid, (state, { uid }) => {
    return { ...state, uid: uid };
  })
  // on(LoginStart, (state) => {
  //   return { ...state };
  // })
);
