import { createFeatureSelector, createSelector } from '@ngrx/store';
import { NotesState } from './notes.reducer';

export const selectNotes = createFeatureSelector<NotesState>('notes');

export const selectNotesNotes = createSelector(
  selectNotes,
  (state: NotesState) => state.notes
);
