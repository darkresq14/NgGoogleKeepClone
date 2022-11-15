import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { UiService } from '../shared/ui/ui.service';
import { State } from '../store/app.reducer';
import { AuthSuccess, Logout } from './auth.actions';

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
        this.store.dispatch(AuthSuccess({ uid: user.uid }));
        this.router.navigate(['/']);
      } else {
        this.store.dispatch(Logout());
        this.router.navigate(['/login']);
      }
    });
  }

  //TODO Move to effect
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
