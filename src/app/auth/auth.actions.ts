import { createAction, props } from '@ngrx/store';

export const setAuthenticated = createAction('[Auth] Set isAuthenticated true');
export const setUnauthenticated = createAction(
  '[Auth] Set isAuthenticated false'
);
export const setUid = createAction(
  '[Auth] Set UID',
  props<{ uid: string | null }>()
);
