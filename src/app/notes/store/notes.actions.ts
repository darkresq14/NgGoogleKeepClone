import { createAction, props } from '@ngrx/store';
import { Note } from '../note/note.model';

export const createNote = createAction('[Notes] Create Note', props<Note>());
export const setNotes = createAction(
  '[Notes] Set Notes',
  props<{ notes: Note[] }>()
);
