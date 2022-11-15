import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { State } from '../store/app.reducer';
import { AuthSuccess, LogoutStart } from './auth.actions';

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(
    private store: Store<State>,
    private afAuth: AngularFireAuth,
    private router: Router
  ) {}

  initAuthListener(): void {
    this.afAuth.authState.subscribe((user) => {
      if (user) {
        this.store.dispatch(AuthSuccess({ uid: user.uid }));
        this.router.navigate(['/']);
      } else {
        this.store.dispatch(LogoutStart());
        this.router.navigate(['/login']);
      }
    });
  }
}
