import { createAction, props } from '@ngrx/store';
// import { AuthData } from './auth.model';

// export enum AuthActionTypes {
//   LoginStart = '[Auth] LoginStart',
//   SignupStart = '[Auth] SignupStart',
//   AuthSuccess = '[Auth] AuthSuccess',
// }

export const setAuthenticated = createAction('[Auth] Set isAuthenticated true');
export const setUnauthenticated = createAction(
  '[Auth] Set isAuthenticated false'
);
export const setUid = createAction(
  '[Auth] Set UID',
  props<{ uid: string | null }>()
);

// export const LoginStart = createAction(
//   AuthActionTypes.LoginStart,
//   props<AuthData>()
// );

// export const SignupStart = createAction(
//   AuthActionTypes.SignupStart,
//   props<AuthData>()
// );

// export const AuthSuccess = createAction(AuthActionTypes.AuthSuccess);
