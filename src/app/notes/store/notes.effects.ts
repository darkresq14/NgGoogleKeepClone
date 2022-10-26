import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, exhaustMap, concatMap, mergeMap, catchError, of } from 'rxjs';
import { UiService } from 'src/app/shared/ui/ui.service';
import { NotesService } from '../notes.service';
import * as NotesActions from './notes.actions';
import * as UiActions from '../../shared/ui/ui.actions';
import { State } from 'src/app/store/app.reducer';
import { Store } from '@ngrx/store';

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
    this.store.dispatch(UiActions.startLoading());
    return this.actions$.pipe(
      ofType(NotesActions.getNotes),
      exhaustMap(() =>
        this.notesService.fetchPersonalNotes().pipe(
          map((notes) => {
            this.store.dispatch(UiActions.stopLoading());
            return NotesActions.getNotesSuccess({ notes });
          }),
          catchError((error) => {
            this.store.dispatch(UiActions.stopLoading());
            this.uiService.showSnackbar(error.message, '', 3000);
            return of(NotesActions.getNotesFailure({ error }));
          })
        )
      )
    );
  });
}
