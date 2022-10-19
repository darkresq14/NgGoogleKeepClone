import { createFeatureSelector, createSelector } from '@ngrx/store';
import { NavState } from './nav.reducer';

export const selectNav = createFeatureSelector<NavState>('nav');

export const selectNavIsExpanded = createSelector(
  selectNav,
  (state: NavState) => state.isExpanded
);
