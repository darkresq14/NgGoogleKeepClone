import { createFeatureSelector, createSelector } from '@ngrx/store';
import { UiState } from './ui.reducer';

export const selectUi = createFeatureSelector<UiState>('ui');

export const selectUiIsSidenavExpanded = createSelector(
  selectUi,
  (state: UiState) => state.isSidenavExpanded
);
