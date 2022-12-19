import { Injectable } from '@angular/core';
import {
  Actions,
  createEffect,
  EffectNotification,
  ofType,
  OnRunEffects,
} from '@ngrx/effects';
import {
  catchError,
  of,
  switchMap,
  Observable,
  exhaustMap,
  takeUntil,
  withLatestFrom,
  filter,
} from 'rxjs';
import { UiService } from 'src/app/shared/ui/ui.service';
import { NotesService } from '../notes.service';
import * as NotesActions from './notes.actions';
import * as UiActions from '../../shared/ui/ui.actions';
import * as AuthActions from '../../auth/auth.actions';
import { State } from 'src/app/store/app.reducer';
import { Store } from '@ngrx/store';
import { Note } from '../note/note.model';

@Injectable({
  providedIn: 'root',
})
export class NotesEffects implements OnRunEffects {
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
        return this.notesService.fetchPersonalNotesFirestore();
      }),
      switchMap((res: Note[] | Error) => {
        if (!(res instanceof Error)) {
          this.store.dispatch(UiActions.stopLoading());
          return of(NotesActions.getNotesSuccess({ notes: res }));
        } else {
          this.store.dispatch(UiActions.stopLoading());
          this.uiService.showSnackbar(res.message, '', 3000);
          return of(NotesActions.deleteNoteFailure({ error: res }));
        }
      }),
      catchError((error) => {
        this.store.dispatch(UiActions.stopLoading());
        console.log('Error in getNotes$: ', error);
        this.uiService.showSnackbar(error.message, '', 3000);
        return of(NotesActions.getNotesFailure({ error }));
      })
    );
  });

  ngrxOnRunEffects(resolvedEffects$: Observable<EffectNotification>) {
    return this.actions$.pipe(
      ofType(NotesActions.getNotes),
      exhaustMap(() =>
        resolvedEffects$.pipe(
          takeUntil(this.actions$.pipe(ofType(AuthActions.LogoutSuccess)))
        )
      )
    );
  }

  createOrEditNote$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(NotesActions.createOrEditNote),
      switchMap((props: Note) => {
        this.store.dispatch(UiActions.startLoading());
        return this.notesService.createOrEditNoteFirestore(props);
      }),
      switchMap(() => {
        this.store.dispatch(UiActions.stopLoading());
        return of(NotesActions.createOrEditNoteSuccess());
      }),
      catchError((error) => {
        this.store.dispatch(UiActions.stopLoading());
        console.log('Error in createOrEditNote$: ', error);
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
        return this.notesService.deleteNoteFirestore(props.id);
      }),
      switchMap((res) => {
        if (!(res instanceof Error)) {
          this.store.dispatch(UiActions.stopLoading());
          return of(NotesActions.deleteNoteSuccess());
        } else {
          this.store.dispatch(UiActions.stopLoading());
          this.uiService.showSnackbar(res.message, '', 3000);
          return of(NotesActions.deleteNoteFailure({ error: res }));
        }
      }),
      catchError((error) => {
        this.store.dispatch(UiActions.stopLoading());
        console.log('Error in deleteNote$: ', error);
        this.uiService.showSnackbar(error.message, '', 3000);
        return of(NotesActions.deleteNoteFailure(error));
      })
    );
  });
}
