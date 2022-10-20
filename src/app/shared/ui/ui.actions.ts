import { createAction, props } from '@ngrx/store';

export const toggleSidenav = createAction('[UI] Toggle isSidenavExpanded');

export const toggleInputEditMode = createAction('[UI] Toggle isInputEditMode');

export const setInputEditMode = createAction(
  '[UI] Set isInputEditMode',
  props<{ isInputEditMode: boolean }>()
);

export const startLoading = createAction('[UI] Start Loading');

export const stopLoading = createAction('[UI] Stop Loading');
