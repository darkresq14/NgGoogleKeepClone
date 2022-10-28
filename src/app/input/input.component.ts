import {
  Component,
  ElementRef,
  HostListener,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, take } from 'rxjs';
import { toggleInputEditMode } from '../shared/ui/ui.actions';
import { selectUiIsInputEditMode } from '../shared/ui/ui.selector';
import { State } from '../store/app.reducer';
import { EditComponent } from './edit/edit.component';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.css'],
})
export class InputComponent implements OnInit {
  isEditMode$: Observable<boolean>;
  isEditMode = false;

  @ViewChild('edit') editComponent?: EditComponent;
  @ViewChild('inputContainer') inputContainer?: ElementRef;

  @HostListener('document:click', ['$event'])
  clickedOut(event: MouseEvent) {
    if (this.inputContainer?.nativeElement) {
      if (
        !this.inputContainer.nativeElement.contains(event.target) &&
        this.isEditMode === true
      ) {
        this.editComponent!.disableEditMode();
      }

      this.isEditMode$
        .pipe(take(1))
        .subscribe((res) => (this.isEditMode = res));
    }
  }

  constructor(private store: Store<State>) {
    this.isEditMode$ = store.select(selectUiIsInputEditMode);
  }

  ngOnInit(): void {}

  newTextNote() {
    this.store.dispatch(toggleInputEditMode());
  }
}
