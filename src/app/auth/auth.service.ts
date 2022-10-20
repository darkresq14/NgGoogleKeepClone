import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import firebase from 'firebase/compat/app';
import { startLoading, stopLoading } from '../shared/ui/ui.actions';
import { UiService } from '../shared/ui/ui.service';
import { State } from '../store/app.reducer';
import { setAuthenticated, setUid } from './auth.actions';
import { RegisterData } from './auth.model';

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(
    private store: Store<State>,
    private afAuth: AngularFireAuth,
    private router: Router,
    private uiService: UiService
  ) {}

  registerUser(authData: RegisterData) {
    this.store.dispatch(startLoading());
    this.afAuth
      .createUserWithEmailAndPassword(authData.email, authData.password)
      .then(() => {
        this.store.dispatch(stopLoading());
      })
      .catch((err) => {
        this.store.dispatch(stopLoading());
        this.uiService.showSnackbar(err.message, '', 3000);
      });
  }

  loginWithGoogle() {
    this.afAuth
      .signInWithPopup(new firebase.auth.GoogleAuthProvider())
      .then((data) => {
        this.loginSuccess();
        // console.log(data);
      })
      .catch((err) => console.log(err));
  }

  loginSuccess() {
    this.store.dispatch(setAuthenticated());
    this.router.navigate(['/']);
    this.afAuth.currentUser.then((user) => {
      if (user) {
        this.store.dispatch(setUid({ uid: user.uid }));
      }
    });
  }
}
