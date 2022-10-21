import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  NgForm,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { selectUiIsLoading } from 'src/app/shared/ui/ui.selector';
import Validation from 'src/app/shared/validation';
import { State } from 'src/app/store/app.reducer';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  isLoading$: Observable<boolean>;
  signupForm: FormGroup;
  hidePassword = true;
  hideConfirmPassword = true;

  constructor(
    iconRegistry: MatIconRegistry,
    sanitizer: DomSanitizer,
    private authService: AuthService,
    private store: Store<State>,
    private auth: AuthService
  ) {
    this.isLoading$ = this.store.select(selectUiIsLoading);

    iconRegistry.addSvgIcon(
      'google-g-logo',
      sanitizer.bypassSecurityTrustResourceUrl(
        '../../assets/Google__G__Logo.svg'
      )
    );

    this.signupForm = new FormGroup(
      {
        email: new FormControl('', {
          validators: [Validators.required, Validators.email],
        }),
        password: new FormControl('', {
          validators: [Validators.required, Validators.minLength(6)],
        }),
        confirmPassword: new FormControl(''),
      },
      { validators: [Validation.match('password', 'confirmPassword')] }
    );
  }

  ngOnInit(): void {}

  onSubmit() {
    this.authService.registerUser({
      email: this.signupForm.value.email,
      password: this.signupForm.value.confirmPassword,
    });
  }

  loginWithGoogle() {
    this.auth.loginWithGoogle();
  }
}
