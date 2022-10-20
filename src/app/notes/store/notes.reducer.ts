import { createReducer, on } from '@ngrx/store';
import { Note } from '../note/note.model';
import { createNote } from './notes.actions';

export interface NotesState {
  notes: Note[];
}

const INITIAL_STATE = {
  notes: [
    { title: 'Test Note 1', content: 'This is a test note' },
    { title: 'Test Note 2', content: 'This is a test note' },
    { title: 'Test Note 3', content: 'This is a test note' },
    { title: 'Test Note 4', content: 'This is a test note' },
    { title: 'Test Note 5', content: 'This is a test note' },
    { title: 'Test Note 6', content: 'This is a test note' },
    { title: 'Test Note 7', content: 'This is a test note' },
    { title: 'Test Note 8', content: 'This is a test note' },
    { title: 'Test Note 9', content: 'This is a test note' },
  ],
};

export const notesReducer = createReducer(
  INITIAL_STATE,
  on(createNote, (state, note: Note) => {
    return { ...state, notes: [...state.notes, note] };
  })
);
