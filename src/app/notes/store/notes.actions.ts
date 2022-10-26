import { createAction, props } from '@ngrx/store';
import { Note } from '../note/note.model';

export enum NotesActionTypes {
  GetNotes = '[Notes] GetNotes',
  GetNotesSuccess = '[Notes] GetNotesSuccess',
  GetNotesFailure = '[Notes] GetNotesFailure',
  CreateNote = '[Notes] CreateNote',
  CreateNoteSuccess = '[Notes] CreateNoteSuccess',
  CreateNoteFailure = '[Notes] CreateNoteFailure',
}

export const getNotes = createAction(NotesActionTypes.GetNotes);

export const getNotesSuccess = createAction(
  NotesActionTypes.GetNotesSuccess,
  props<{ notes: Note[] }>()
);

export const getNotesFailure = createAction(
  NotesActionTypes.GetNotesFailure,
  props<{ error: Error }>()
);

export const createNote = createAction(
  NotesActionTypes.CreateNote,
  props<Note>()
);

export const createNoteSuccess = createAction(
  NotesActionTypes.CreateNoteSuccess
);

export const createNoteFailure = createAction(
  NotesActionTypes.CreateNoteFailure,
  props<{ error: Error }>()
);
