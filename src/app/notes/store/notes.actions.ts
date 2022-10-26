import { createAction, props } from '@ngrx/store';
import { Note } from '../note/note.model';

export enum NotesActionTypes {
  GetNotes = '[Notes] GetNotes',
  GetNotesSuccess = '[Notes] GetNotesSuccess',
  GetNotesFailure = '[Notes] GetNotesFailure',
}

export const createNote = createAction('[Notes] Create Note', props<Note>());
export const setNotes = createAction(
  '[Notes] Set Notes',
  props<{ notes: Note[] }>()
);

export const getNotes = createAction(NotesActionTypes.GetNotes);

export const getNotesSuccess = createAction(
  NotesActionTypes.GetNotesSuccess,
  props<{ notes: Note[] }>()
);

export const getNotesFailure = createAction(
  NotesActionTypes.GetNotesFailure,
  props<{ error: Error }>()
);
