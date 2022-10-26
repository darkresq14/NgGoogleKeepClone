import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, exhaustMap, concatMap, mergeMap, catchError, of } from 'rxjs';
import { UiService } from 'src/app/shared/ui/ui.service';
import { NotesService } from '../notes.service';
import * as NotesActions from './notes.actions';
import * as UiActions from '../../shared/ui/ui.actions';

@Injectable({
  providedIn: 'root',
})
export class NotesEffects {
  constructor(
    private actions$: Actions,
    private notesService: NotesService,
    private uiService: UiService
  ) {}

  getNotes$ = createEffect(() => {
    UiActions.startLoading();
    return this.actions$.pipe(
      ofType(NotesActions.getNotes),
      exhaustMap(() =>
        this.notesService.fetchPersonalNotes().pipe(
          map((notes) => {
            UiActions.stopLoading();
            return NotesActions.getNotesSuccess({ notes });
          }),
          catchError((error) => {
            UiActions.stopLoading();
            this.uiService.showSnackbar(error.message, '', 3000);
            return of(NotesActions.getNotesFailure({ error }));
          })
        )
      )
    );
  });
}
