import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { selectAuthIsAuthenticated } from 'src/app/auth/auth.selector';
import { AuthService } from 'src/app/auth/auth.service';
import { State } from 'src/app/store/app.reducer';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  @Output() sidenavToggle = new EventEmitter<void>();
  isAuthenticated$: Observable<boolean>;

  constructor(private auth: AuthService, private store: Store<State>) {
    this.isAuthenticated$ = this.store.select(selectAuthIsAuthenticated);
  }

  ngOnInit(): void {}

  onToggleSidenav() {
    this.sidenavToggle.emit();
  }

  logoutClicked() {
    this.auth.signOut();
  }
}
