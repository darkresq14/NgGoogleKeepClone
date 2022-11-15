import { createAction, props } from '@ngrx/store';
import { AuthData } from './auth.model';

export enum AuthActionTypes {
  LoginStart = '[Auth] LoginStart',
  SignupStart = '[Auth] SignupStart',
  GoogleLoginStart = '[Auth] GoogleLoginStart',
  AuthSuccess = '[Auth] AuthSuccess',
  AuthFailure = '[Auth] AuthFailure',
  LogoutStart = '[Auth] LogoutStart',
  LogoutSuccess = '[Auth] LogoutSuccess',
  LogoutFailure = '[Auth] LogoutFailure',
}

export const LoginStart = createAction(
  AuthActionTypes.LoginStart,
  props<AuthData>()
);

export const SignupStart = createAction(
  AuthActionTypes.SignupStart,
  props<AuthData>()
);

export const GoogleLoginStart = createAction(AuthActionTypes.GoogleLoginStart);

export const AuthSuccess = createAction(
  AuthActionTypes.AuthSuccess,
  props<{ uid: string | null }>()
);

export const AuthFailure = createAction(
  AuthActionTypes.AuthFailure,
  props<{ error: Error }>()
);

export const LogoutStart = createAction(AuthActionTypes.LogoutStart);

export const LogoutSuccess = createAction(AuthActionTypes.LogoutSuccess);

export const LogoutFailure = createAction(
  AuthActionTypes.LogoutFailure,
  props<{ error: Error }>()
);
