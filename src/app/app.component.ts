import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AuthService } from './auth/auth.service';
import { toggleSidenav } from './shared/ui/ui.actions';
import { selectUiIsSidenavExpanded } from './shared/ui/ui.selector';
import { State } from './store/app.reducer';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  isExpanded$: Observable<boolean>;

  constructor(private store: Store<State>, private auth: AuthService) {
    this.isExpanded$ = store.select(selectUiIsSidenavExpanded);
  }

  ngOnInit(): void {
    this.auth.initAuthListener();
  }

  onSidenavToggle() {
    this.store.dispatch(toggleSidenav());
  }
}
