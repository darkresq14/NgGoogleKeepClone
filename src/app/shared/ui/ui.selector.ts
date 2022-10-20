import { createFeatureSelector, createSelector } from '@ngrx/store';
import { UiState } from './ui.reducer';

export const selectUi = createFeatureSelector<UiState>('ui');

export const selectUiIsSidenavExpanded = createSelector(
  selectUi,
  (state: UiState) => state.isSidenavExpanded
);

export const selectUiIsInputEditMode = createSelector(
  selectUi,
  (state: UiState) => state.isInputEditMode
);

export const selectUiIsLoading = createSelector(
  selectUi,
  (state: UiState) => state.isLoading
);
