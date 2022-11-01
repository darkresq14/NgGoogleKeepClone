import {
  Component,
  OnInit,
  ViewChild,
  Input,
  HostListener,
  ElementRef,
} from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, take } from 'rxjs';
import { setInputEditMode } from 'src/app/shared/ui/ui.actions';
import { NgForm } from '@angular/forms';
import { State } from 'src/app/store/app.reducer';
import { DialogData } from 'src/app/notes/note-edit-dialog/note-edit-dialog.component';
import { selectUiIsInputEditMode } from 'src/app/shared/ui/ui.selector';
import { Note } from 'src/app/notes/note/note.model';
import { createOrEditNote } from 'src/app/notes/store/notes.actions';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css'],
})
export class EditComponent implements OnInit {
  inputTextarea: string = '';
  inputTitle: string = '';
  note?: Note;

  isEditMode$: Observable<boolean>;
  isEditMode: boolean = false;

  @Input() data?: DialogData;
  @ViewChild('form') form?: NgForm;

  @HostListener('document:click', ['$event'])
  clickedOut(event: MouseEvent) {
    if (this.eRef?.nativeElement) {
      if (
        !this.eRef?.nativeElement.contains(event.target) &&
        this.isEditMode === true
      ) {
        this.disableEditMode();
      }

      this.isEditMode$
        .pipe(take(1))
        .subscribe((res) => (this.isEditMode = res));
    }
  }

  constructor(private store: Store<State>, private eRef: ElementRef) {
    this.isEditMode$ = store.select(selectUiIsInputEditMode);
  }

  ngOnInit(): void {
    if (this.data?.note) {
      this.note = this.data.note;

      if (this.data.note.title) {
        this.inputTitle = this.data.note.title;
      }
      if (this.data.note.content) {
        this.inputTextarea = this.data.note.content;
      }
    }
  }

  disableEditMode() {
    this.store.dispatch(setInputEditMode({ isInputEditMode: false }));
    if (this.inputTitle || this.inputTextarea) {
      if (this.note) {
        this.store.dispatch(
          createOrEditNote({
            ...this.note,
            title: this.inputTitle,
            content: this.inputTextarea,
          })
        );
      } else {
        this.store.dispatch(
          createOrEditNote({
            title: this.inputTitle,
            content: this.inputTextarea,
          })
        );
      }

      if (this.form) {
        this.form.reset();
      }
    }
  }
}
