import { Component, OnInit } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { selectUiIsLoading } from 'src/app/shared/ui/ui.selector';
import { State } from 'src/app/store/app.reducer';
import { GoogleLoginStart, LoginStart } from '../auth.actions';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  isLoading$: Observable<boolean>;
  password: string = '';
  email: string = '';

  hide = true;

  constructor(
    iconRegistry: MatIconRegistry,
    sanitizer: DomSanitizer,
    private store: Store<State>,
    private router: Router
  ) {
    this.isLoading$ = this.store.select(selectUiIsLoading);

    iconRegistry.addSvgIcon(
      'google-g-logo',
      sanitizer.bypassSecurityTrustResourceUrl(
        '../../assets/Google__G__Logo.svg'
      )
    );
  }

  ngOnInit(): void {}

  onSubmit(): void {
    this.store.dispatch(
      LoginStart({ email: this.email, password: this.password })
    );
  }

  loginWithGoogle() {
    this.store.dispatch(GoogleLoginStart());
  }

  goToSignUp() {
    this.router.navigate(['/signup']);
  }
}
