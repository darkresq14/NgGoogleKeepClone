import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import firebase from 'firebase/compat/app';
import { startLoading, stopLoading } from '../shared/ui/ui.actions';
import { UiService } from '../shared/ui/ui.service';
import { State } from '../store/app.reducer';
import { setAuthenticated, setUid, setUnauthenticated } from './auth.actions';
import { AuthData } from './auth.model';

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(
    private store: Store<State>,
    private afAuth: AngularFireAuth,
    private router: Router,
    private uiService: UiService
  ) {}

  initAuthListener(): void {
    this.afAuth.authState.subscribe((user) => {
      if (user) {
        this.store.dispatch(setAuthenticated());
        this.store.dispatch(setUid({ uid: user.uid }));
        this.router.navigate(['/']);
      } else {
        this.store.dispatch(setUnauthenticated());
        this.store.dispatch(setUid({ uid: null }));
        this.router.navigate(['/login']);
      }
    });
  }

  registerUser(authData: AuthData) {
    this.store.dispatch(startLoading());
    this.afAuth
      .createUserWithEmailAndPassword(authData.email, authData.password)
      .then(() => {
        this.store.dispatch(stopLoading());
        this.signInSuccess();
      })
      .catch((err) => {
        this.store.dispatch(stopLoading());
        this.uiService.showSnackbar(err.message, '', 3000);
      });
  }

  signInWithEmailAndPassword(authData: AuthData) {
    this.store.dispatch(startLoading());
    this.afAuth
      .signInWithEmailAndPassword(authData.email, authData.password)
      .then(() => {
        this.store.dispatch(stopLoading());
        this.signInSuccess();
      })
      .catch((err) => {
        this.store.dispatch(stopLoading());
        this.uiService.showSnackbar(err.message, '', 3000);
      });
  }

  signInWithGoogle() {
    this.afAuth
      .signInWithPopup(new firebase.auth.GoogleAuthProvider())
      .then(() => {
        this.signInSuccess();
      })
      .catch((err) => console.log(err.message));
  }

  signInSuccess() {
    console.log('Sign In Success');
  }

  signOut() {
    this.afAuth
      .signOut()
      .then(() => {
        console.log('Sign Out Success');
      })
      .catch((err) => {
        this.uiService.showSnackbar(err.message, '', 3000);
      });
  }
}
