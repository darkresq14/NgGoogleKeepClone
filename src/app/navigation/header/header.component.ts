import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { LogoutStart } from 'src/app/auth/auth.actions';
import { selectAuthIsAuthenticated } from 'src/app/auth/auth.selector';
import { selectUiIsLoading } from 'src/app/shared/ui/ui.selector';
import { State } from 'src/app/store/app.reducer';
import * as UiActions from '../../shared/ui/ui.actions';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  @Output() sidenavToggle = new EventEmitter<void>();
  isAuthenticated$: Observable<boolean>;
  isLoading$: Observable<boolean>;

  constructor(private store: Store<State>) {
    this.isAuthenticated$ = this.store.select(selectAuthIsAuthenticated);
    this.isLoading$ = this.store.select(selectUiIsLoading);
  }

  ngOnInit(): void {}

  onToggleSidenav() {
    this.sidenavToggle.emit();
  }

  logoutClicked() {
    this.store.dispatch(LogoutStart());
  }

  refreshClicked() {
    this.store.dispatch(UiActions.startLoading());
    // this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
    //   this.router.navigate([this.router.url]);
    // });
    window.location.reload();
    this.store.dispatch(UiActions.stopLoading());
  }
}
