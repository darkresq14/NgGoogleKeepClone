import { Component, OnInit } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { AuthService } from '../auth.service';

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
    iconRegistry: MatIconRegistry,
    sanitizer: DomSanitizer,
    private auth: AuthService
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
    this.auth.loginWithGoogle();
  }
}
