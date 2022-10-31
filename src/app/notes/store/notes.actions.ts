import { createAction, props } from '@ngrx/store';
import { Note } from '../note/note.model';

export enum NotesActionTypes {
  GetNotes = '[Notes] GetNotes',
  GetNotesSuccess = '[Notes] GetNotesSuccess',
  GetNotesFailure = '[Notes] GetNotesFailure',
  CreateOrEditNote = '[Notes] CreateOrEditNote',
  CreateOrEditNoteSuccess = '[Notes] CreateOrEditNoteSuccess',
  CreateOrEditNoteFailure = '[Notes] CreateOrEditNoteFailure',
  // CreateNote = '[Notes] CreateNote',
  // CreateNoteSuccess = '[Notes] CreateNoteSuccess',
  // CreateNoteFailure = '[Notes] CreateNoteFailure',
  // EditNote = '[Notes] EditNote',
  // EditNoteSuccess = '[Notes] EditNoteSuccess',
  // EditNoteFailure = '[Notes] EditNoteFailure',
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

export const createOrEditNote = createAction(
  NotesActionTypes.CreateOrEditNote,
  props<Note>()
);

export const createOrEditNoteSuccess = createAction(
  NotesActionTypes.CreateOrEditNoteSuccess
);

export const createOrEditNoteFailure = createAction(
  NotesActionTypes.CreateOrEditNoteFailure,
  props<{ error: Error }>()
);

// export const createNote = createAction(
//   NotesActionTypes.CreateNote,
//   props<Note>()
// );

// export const createNoteSuccess = createAction(
//   NotesActionTypes.CreateNoteSuccess
// );

// export const createNoteFailure = createAction(
//   NotesActionTypes.CreateNoteFailure,
//   props<{ error: Error }>()
// );

// export const editNote = createAction(NotesActionTypes.EditNote, props<Note>());

// export const editNoteSuccess = createAction(NotesActionTypes.EditNoteSuccess);

// export const editNoteFailure = createAction(
//   NotesActionTypes.EditNoteFailure,
//   props<{ error: Error }>()
// );
