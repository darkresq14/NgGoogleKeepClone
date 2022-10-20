import { createReducer, on } from '@ngrx/store';
import { toggleSidenav } from './ui.actions';

export interface UiState {
  isSidenavExpanded: boolean;
}

const INITIAL_STATE = {
  isSidenavExpanded: true,
};

export const uiReducer = createReducer(
  INITIAL_STATE,
  on(toggleSidenav, (state) => {
    return { ...state, isSidenavExpanded: !state.isSidenavExpanded };
  })
);
