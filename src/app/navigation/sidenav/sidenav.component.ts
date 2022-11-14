import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { selectUiIsSidenavExpanded } from 'src/app/shared/ui/ui.selector';
import { State } from '../../store/app.reducer';

@Component({
  selector: 'app-sidenav',
  // animations: [
  //   trigger('openClose', [
  //     // ...
  //     state(
  //       'open',
  //       style({
  //         opacity: 1,
  //         width: '100%',
  //       })
  //     ),
  //     state(
  //       'closed',
  //       style({
  //         opacity: 0,
  //         width: 0,
  //       })
  //     ),
  //     transition('open <=> closed', [animate('0.5s')]),
  //   ]),
  // ],
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css'],
})
export class SidenavComponent implements OnInit {
  isExpanded$: Observable<boolean>;

  constructor(private store: Store<State>) {
    this.isExpanded$ = store.select(selectUiIsSidenavExpanded);
  }

  ngOnInit(): void {}
}
