import { createReducer, on } from '@ngrx/store';
import { Note } from '../note/note.model';
import { createNote, getNotesFailure, getNotesSuccess } from './notes.actions';

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
  on(createNote, (state, note: Note) => {
    return { ...state, notes: [...state.notes, note] };
  })
);
