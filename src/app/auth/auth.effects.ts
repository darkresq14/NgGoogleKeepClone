import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { switchMap, map, from, catchError, of, take, first } from 'rxjs';
import { AuthData, User } from './auth.model';
import * as AuthActions from './auth.actions';
import * as UiActions from '../shared/ui/ui.actions';
import { UiService } from '../shared/ui/ui.service';
import { Store } from '@ngrx/store';
import { State } from '../store/app.reducer';
import firebase from 'firebase/compat/app';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root',
})
export class AuthEffects {
  constructor(
    private actions$: Actions,
    private afAuth: AngularFireAuth,
    private store: Store<State>,
    private uiService: UiService,
    private db: AngularFirestore
  ) {}

  authLogin$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AuthActions.AuthActionTypes.LoginStart),
      switchMap((props: AuthData) => {
        this.store.dispatch(UiActions.startLoading());
        return from(
          this.afAuth.signInWithEmailAndPassword(props.email, props.password)
        );
      }),
      first(),
      switchMap((auth) => {
        this.store.dispatch(UiActions.stopLoading());
        //TODO Reconsider this return
        return of(
          AuthActions.AuthSuccess({
            uid: auth.user ? auth.user.uid : null,
          })
        );
      }),
      catchError((error: Error) => {
        this.store.dispatch(UiActions.stopLoading());
        this.uiService.showSnackbar(error.message, '', 3000);
        return of(AuthActions.AuthFailure({ error }));
      })
    );
  });

  authSignup$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AuthActions.AuthActionTypes.SignupStart),
      switchMap((props: AuthData) => {
        this.store.dispatch(UiActions.startLoading());
        return this.afAuth.createUserWithEmailAndPassword(
          props.email,
          props.password
        );
      }),
      switchMap((auth) => {
        this.store.dispatch(UiActions.stopLoading());
        this.store.dispatch(
          AuthActions.CreateUserStart({
            uid: auth.user!.uid,
            email: auth.user!.email,
          })
        );
        return of(
          AuthActions.AuthSuccess({
            uid: auth.user!.uid,
          })
        );
      }),
      catchError((error: Error) => {
        this.store.dispatch(UiActions.stopLoading());
        this.uiService.showSnackbar(error.message, '', 3000);
        return of(AuthActions.AuthFailure({ error }));
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
        );
      }),
      first(),
      switchMap((auth) => {
        this.store.dispatch(UiActions.stopLoading());
        return of(
          AuthActions.AuthSuccess({
            uid: auth.user ? auth.user.uid : null,
          })
        );
      }),
      catchError((error: Error) => {
        this.store.dispatch(UiActions.stopLoading());
        this.uiService.showSnackbar(error.message, '', 3000);
        return of(AuthActions.AuthFailure({ error }));
      })
    );
  });

  createUser$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AuthActions.AuthActionTypes.CreateUserStart),
      switchMap((props: User) => {
        return this.db.collection('users').doc(props.uid).set({
          email: props.email,
        });
      }),
      switchMap(() => {
        return of(AuthActions.CreateUserSuccess());
      }),
      catchError((error: Error) => {
        console.log('Error in createUser$: ', error);
        this.uiService.showSnackbar(error.message, '', 3000);
        return of(AuthActions.AuthFailure({ error }));
      })
    );
  });

  authLogout$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AuthActions.AuthActionTypes.LogoutStart),
      switchMap(() => {
        this.store.dispatch(UiActions.startLoading());
        return from(this.afAuth.signOut());
      }),
      first(),
      switchMap(() => {
        this.store.dispatch(UiActions.stopLoading());
        return of(AuthActions.LogoutSuccess());
      }),
      catchError((error: Error) => {
        this.store.dispatch(UiActions.stopLoading());
        this.uiService.showSnackbar(error.message, '', 3000);
        return of(AuthActions.LogoutFailure({ error }));
      })
    );
  });
}
