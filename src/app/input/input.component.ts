import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { toggleInputEditMode } from '../shared/ui/ui.actions';
import { State } from '../store/app.reducer';
import { selectUiIsInputEditMode } from '../shared/ui/ui.selector';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.css'],
})
export class InputComponent implements OnInit {
  isEditMode$: Observable<boolean>;

  constructor(private store: Store<State>) {
    this.isEditMode$ = store.select(selectUiIsInputEditMode);
  }

  ngOnInit(): void {}

  newTextNote() {
    this.store.dispatch(toggleInputEditMode());
  }
}
