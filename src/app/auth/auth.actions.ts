import { createAction, props } from '@ngrx/store';
import { AuthData, User } from './auth.model';

export enum AuthActionTypes {
  LoginStart = '[Auth] LoginStart',
  SignupStart = '[Auth] SignupStart',
  GoogleLoginStart = '[Auth] GoogleLoginStart',
  AuthSuccess = '[Auth] AuthSuccess',
  AuthFailure = '[Auth] AuthFailure',
  LogoutStart = '[Auth] LogoutStart',
  LogoutSuccess = '[Auth] LogoutSuccess',
  LogoutFailure = '[Auth] LogoutFailure',
  CreateUserStart = '[Auth] CreateUserStart',
  CreateUserSuccess = '[Auth] CreateUserSuccess',
  CreateUserFailure = '[Auth] CreateUserFailure',
  GetUsers = '[Auth] GetUsers',
  GetUsersSuccess = '[Auth] GetUsersSuccess',
  GetUsersFailure = '[Auth] GetUsersFailure',
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

export const CreateUserStart = createAction(
  AuthActionTypes.CreateUserStart,
  props<User>()
);

export const CreateUserSuccess = createAction(
  AuthActionTypes.CreateUserSuccess
);

export const CreateUserFailure = createAction(
  AuthActionTypes.CreateUserFailure,
  props<{ error: Error }>()
);

export const GetUsersSuccess = createAction(
  AuthActionTypes.GetUsersSuccess,
  props<{ users: User[] }>()
);

export const GetUsersFailure = createAction(
  AuthActionTypes.GetUsersFailure,
  props<{ error: Error }>()
);
