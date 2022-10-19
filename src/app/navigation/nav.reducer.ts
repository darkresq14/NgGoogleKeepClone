import { createReducer, on } from '@ngrx/store';
import { toggleSidenav } from './nav.actions';

export interface NavState {
  isExpanded: boolean;
}

export const INITIAL_STATE = {
  isExpanded: true,
};

export const navReducer = createReducer(
  INITIAL_STATE,
  on(toggleSidenav, (state) => {
    return { ...state, isExpanded: !state.isExpanded };
  })
);
