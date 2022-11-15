import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { switchMap, map, from, catchError, of, take } from 'rxjs';
import { AuthData } from './auth.model';
import * as AuthActions from './auth.actions';
import * as UiActions from '../shared/ui/ui.actions';
import { UiService } from '../shared/ui/ui.service';
import { Store } from '@ngrx/store';
import { State } from '../store/app.reducer';
import firebase from 'firebase/compat/app';

@Injectable({
  providedIn: 'root',
})
export class AuthEffects {
  constructor(
    private actions$: Actions,
    private afAuth: AngularFireAuth,
    private store: Store<State>,
    private uiService: UiService
  ) {}

  authLogin$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AuthActions.AuthActionTypes.LoginStart),
      switchMap((props: AuthData) => {
        this.store.dispatch(UiActions.startLoading());
        return from(
          this.afAuth.signInWithEmailAndPassword(props.email, props.password)
        ).pipe(
          take(1),
          map((auth) => {
            this.store.dispatch(UiActions.stopLoading());
            return AuthActions.AuthSuccess({
              uid: auth.user ? auth.user.uid : null,
            });
          }),
          catchError((error: Error) => {
            this.store.dispatch(UiActions.stopLoading());
            this.uiService.showSnackbar(error.message, '', 3000);
            return of(AuthActions.AuthFailure({ error }));
          })
        );
      })
    );
  });

  authSignup$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AuthActions.AuthActionTypes.SignupStart),
      switchMap((props: AuthData) => {
        this.store.dispatch(UiActions.startLoading());
        return from(
          this.afAuth.createUserWithEmailAndPassword(
            props.email,
            props.password
          )
        ).pipe(
          take(1),
          map((auth) => {
            this.store.dispatch(UiActions.stopLoading());
            return AuthActions.AuthSuccess({
              uid: auth.user ? auth.user.uid : null,
            });
          }),
          catchError((error: Error) => {
            this.store.dispatch(UiActions.stopLoading());
            this.uiService.showSnackbar(error.message, '', 3000);
            return of(AuthActions.AuthFailure({ error }));
          })
        );
      })
    );
  });

  googleLogin$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AuthActions.AuthActionTypes.GoogleLoginStart),
      switchMap(() => {
        this.store.dispatch(UiActions.startLoading());
        return from(
          this.afAuth.signInWithPopup(new firebase.auth.GoogleAuthProvider())
        ).pipe(
          take(1),
          map((auth) => {
            this.store.dispatch(UiActions.stopLoading());
            return AuthActions.AuthSuccess({
              uid: auth.user ? auth.user.uid : null,
            });
          }),
          catchError((error: Error) => {
            this.store.dispatch(UiActions.stopLoading());
            this.uiService.showSnackbar(error.message, '', 3000);
            return of(AuthActions.AuthFailure({ error }));
          })
        );
      })
    );
  });

  authLogout$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AuthActions.AuthActionTypes.Logout),
      map(() => {
        return UiActions.stopLoading();
      })
    );
  });
}
