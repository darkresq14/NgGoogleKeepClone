import {
  Component,
  ElementRef,
  HostListener,
  OnInit,
  ViewChild,
} from '@angular/core';
import { NgForm } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable, take } from 'rxjs';
import { NotesService } from '../notes/notes.service';
import { setInputEditMode, toggleInputEditMode } from '../shared/ui/ui.actions';
import { selectUiIsInputEditMode } from '../shared/ui/ui.selector';
import { State } from '../store/app.reducer';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.css'],
})
export class InputComponent implements OnInit {
  isEditMode$: Observable<boolean>;
  isEditMode = false;
  inputTextarea: string = '';
  inputTitle: string = '';
  @ViewChild('inputContainer') inputContainer?: ElementRef;
  @ViewChild('form') form?: NgForm;

  @HostListener('document:click', ['$event'])
  clickedOut(event: MouseEvent) {
    if (this.inputContainer?.nativeElement) {
      if (
        !this.inputContainer.nativeElement.contains(event.target) &&
        this.isEditMode === true
      ) {
        this.disableEditMode();
      }

      this.isEditMode$
        .pipe(take(1))
        .subscribe((res) => (this.isEditMode = res));
    }
  }

  constructor(private store: Store<State>, private notesService: NotesService) {
    this.isEditMode$ = store.select(selectUiIsInputEditMode);
  }

  ngOnInit(): void {}

  newTextNote() {
    this.store.dispatch(toggleInputEditMode());
  }

  disableEditMode() {
    this.store.dispatch(setInputEditMode({ isInputEditMode: false }));
    if (this.inputTitle || this.inputTextarea) {
      this.notesService.finishedEditingNote(
        this.inputTitle,
        this.inputTextarea
      );
      if (this.form) {
        this.form.reset();
      }
    }
  }
}
