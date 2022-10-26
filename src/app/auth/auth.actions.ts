import { createAction, props } from '@ngrx/store';
import { AuthData } from './auth.model';

export enum AuthActionTypes {
  LoginStart = '[Auth] LoginStart',
  SignupStart = '[Auth] SignupStart',
  AuthSuccess = '[Auth] AuthSuccess',
  AuthFailure = '[Auth] AuthFailure',
  Logout = '[Auth] Logout',
}

export const LoginStart = createAction(
  AuthActionTypes.LoginStart,
  props<AuthData>()
);

export const SignupStart = createAction(
  AuthActionTypes.SignupStart,
  props<AuthData>()
);

export const AuthSuccess = createAction(
  AuthActionTypes.AuthSuccess,
  props<{ uid: string | null }>()
);

export const AuthFailure = createAction(
  AuthActionTypes.AuthFailure,
  props<{ error: Error }>()
);

export const Logout = createAction(AuthActionTypes.Logout);
