import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { toggleSidenav } from './navigation/nav.actions';
import { selectNavIsExpanded } from './navigation/nav.selector';
import { State } from './store/app.reducer';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  isExpanded$: Observable<boolean>;

  constructor(private store: Store<State>) {
    this.isExpanded$ = store.select(selectNavIsExpanded);
  }

  onSidenavToggle() {
    this.store.dispatch(toggleSidenav());
  }
}
