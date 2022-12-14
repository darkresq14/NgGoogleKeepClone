import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, catchError, of, switchMap } from 'rxjs';
import { UiService } from 'src/app/shared/ui/ui.service';
import { NotesService } from '../notes.service';
import * as NotesActions from './notes.actions';
import * as UiActions from '../../shared/ui/ui.actions';
import { State } from 'src/app/store/app.reducer';
import { Store } from '@ngrx/store';
import { Note } from '../note/note.model';

@Injectable({
  providedIn: 'root',
})
export class NotesEffects {
  constructor(
    private actions$: Actions,
    private notesService: NotesService,
    private uiService: UiService,
    private store: Store<State>
  ) {}

  getNotes$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(NotesActions.getNotes),
      switchMap(() => {
        this.store.dispatch(UiActions.startLoading());
        return this.notesService.fetchPersonalNotesFirestore().pipe(
          map((notes) => {
            this.store.dispatch(UiActions.stopLoading());
            return NotesActions.getNotesSuccess({ notes });
          }),
          catchError((error) => {
            this.store.dispatch(UiActions.stopLoading());
            this.uiService.showSnackbar(error.message, '', 3000);
            return of(NotesActions.getNotesFailure({ error }));
          })
        );
      })
    );
  });

  createOrEditNote$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(NotesActions.createOrEditNote),
      switchMap((props: Note) => {
        this.store.dispatch(UiActions.startLoading());
        return this.notesService.createOrEditNoteFirestore(props).pipe(
          map(() => {
            this.store.dispatch(UiActions.stopLoading());
            return NotesActions.createOrEditNoteSuccess();
          }),
          catchError((error) => {
            this.store.dispatch(UiActions.stopLoading());
            this.uiService.showSnackbar(error.message, '', 3000);
            return of(NotesActions.createOrEditNoteFailure(error));
          })
        );
      }),
      catchError((error) => {
        this.store.dispatch(UiActions.stopLoading());
        this.uiService.showSnackbar(error.message, '', 3000);
        return of(NotesActions.createOrEditNoteFailure(error));
      })
    );
  });

  deleteNote$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(NotesActions.deleteNote),
      switchMap((props) => {
        this.store.dispatch(UiActions.startLoading());
        return this.notesService.deleteNoteFirestore(props.id).pipe(
          map(() => {
            this.store.dispatch(UiActions.stopLoading());
            return NotesActions.deleteNoteSuccess();
          }),
          catchError((error) => {
            this.store.dispatch(UiActions.stopLoading());
            this.uiService.showSnackbar(error.message, '', 3000);
            return of(NotesActions.deleteNoteFailure(error));
          })
        );
      }),
      catchError((error) => {
        this.store.dispatch(UiActions.stopLoading());
        this.uiService.showSnackbar(error.message, '', 3000);
        return of(NotesActions.deleteNoteFailure(error));
      })
    );
  });
}
