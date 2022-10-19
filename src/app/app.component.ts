import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { toggleSidenav } from './navigation/nav.actions';
import { State } from './store/app.reducer';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  constructor(private store: Store<State>) {}

  onSidenavToggle() {
    this.store.dispatch(toggleSidenav());
  }
}
