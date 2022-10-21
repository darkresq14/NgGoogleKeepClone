import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AuthService } from './auth/auth.service';
import { toggleSidenav } from './shared/ui/ui.actions';
import { State } from './store/app.reducer';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  constructor(private store: Store<State>, private auth: AuthService) {}

  ngOnInit(): void {
    this.auth.initAuthListener();
  }

  onSidenavToggle() {
    this.store.dispatch(toggleSidenav());
  }
}
