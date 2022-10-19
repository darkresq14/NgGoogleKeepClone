import { createAction } from '@ngrx/store';

export const setAuthenticated = createAction('[Auth] Set isAuthenticated true');
export const setUnauthenticated = createAction(
  '[Auth] Set isAuthenticated false'
);
