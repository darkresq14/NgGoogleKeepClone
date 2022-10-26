import { createReducer, on } from '@ngrx/store';
import { Note } from '../note/note.model';
import { createNote, getNotesSuccess, setNotes } from './notes.actions';

export interface NotesState {
  notes: Note[];
  activeNote: Note | null;
}

const INITIAL_STATE: Readonly<NotesState> = {
  notes: [],
  activeNote: null,
};

export const notesReducer = createReducer(
  INITIAL_STATE,
  on(createNote, (state, note: Note) => {
    return { ...state, notes: [...state.notes, note] };
  }),
  on(setNotes, (state, { notes }) => {
    return { ...state, notes: notes };
  }),
  on(getNotesSuccess, (state, { notes }) => {
    return { ...state, notes: notes };
  })
);
