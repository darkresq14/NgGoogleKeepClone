import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import firebase from 'firebase/compat/app';
import { State } from 'src/app/store/app.reducer';
import { setAuthenticated } from '../auth.actions';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  password: string = '';
  email: string = '';

  hide = true;

  constructor(
    private afAuth: AngularFireAuth,
    private store: Store<State>,
    private router: Router,
    iconRegistry: MatIconRegistry,
    sanitizer: DomSanitizer
  ) {
    iconRegistry.addSvgIcon(
      'google-g-logo',
      sanitizer.bypassSecurityTrustResourceUrl(
        '../../assets/Google__G__Logo.svg'
      )
    );
  }

  ngOnInit(): void {}

  onSubmit(): void {}

  loginWithGoogle() {
    this.afAuth
      .signInWithPopup(new firebase.auth.GoogleAuthProvider())
      .then((data) => {
        this.store.dispatch(setAuthenticated());
        this.router.navigate(['/']);
        console.log(data);
      })
      .catch((err) => console.log(err));
  }
}
