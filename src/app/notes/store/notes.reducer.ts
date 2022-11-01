import { createReducer, on } from '@ngrx/store';
import { Note } from '../note/note.model';
import {
  createOrEditNoteFailure,
  createOrEditNoteSuccess,
  deleteNoteFailure,
  deleteNoteSuccess,
  getNotesFailure,
  getNotesSuccess,
} from './notes.actions';

export interface NotesState {
  notes: Note[];
  activeNote: Note | null;
  error: Error | null;
}

const INITIAL_STATE: Readonly<NotesState> = {
  notes: [],
  activeNote: null,
  error: null,
};

export const notesReducer = createReducer(
  INITIAL_STATE,
  on(getNotesSuccess, (state, { notes }) => {
    return { ...state, notes: notes, error: null };
  }),
  on(getNotesFailure, (state, { error }) => {
    return { ...state, notes: [], error: error };
  }),
  on(createOrEditNoteSuccess, (state) => {
    return { ...state, error: null };
  }),
  on(createOrEditNoteFailure, (state, { error }) => {
    return { ...state, error: error };
  }),
  on(deleteNoteSuccess, (state) => {
    return { ...state, error: null };
  }),
  on(deleteNoteFailure, (state, { error }) => {
    return { ...state, error: error };
  })
);
