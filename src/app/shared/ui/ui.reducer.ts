import { createReducer, on } from '@ngrx/store';
import {
  setInputEditMode,
  startLoading,
  stopLoading,
  toggleInputEditMode,
  toggleSidenav,
} from './ui.actions';

export interface UiState {
  isSidenavExpanded: boolean;
  isInputEditMode: boolean;
  isLoading: boolean;
}

const INITIAL_STATE = {
  isSidenavExpanded: true,
  isInputEditMode: false,
  isLoading: false,
};

export const uiReducer = createReducer(
  INITIAL_STATE,
  on(toggleSidenav, (state) => {
    return { ...state, isSidenavExpanded: !state.isSidenavExpanded };
  }),
  on(toggleInputEditMode, (state) => {
    return { ...state, isInputEditMode: !state.isInputEditMode };
  }),
  on(setInputEditMode, (state, { isInputEditMode }) => {
    return { ...state, isInputEditMode: isInputEditMode };
  }),
  on(startLoading, (state) => {
    return { ...state, isLoading: true };
  }),
  on(stopLoading, (state) => {
    return { ...state, isLoading: false };
  })
);
