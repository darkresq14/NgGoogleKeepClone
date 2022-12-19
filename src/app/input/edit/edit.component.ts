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
import { NoteEditDialogData } from 'src/app/notes/note-edit-dialog/note-edit-dialog.component';
import { selectUiIsInputEditMode } from 'src/app/shared/ui/ui.selector';
import { Note } from 'src/app/notes/note/note.model';
import { createOrEditNote } from 'src/app/notes/store/notes.actions';
import { MatMenuTrigger } from '@angular/material/menu';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css'],
})
export class EditComponent implements OnInit {
  inputTextarea: string = '';
  inputTitle: string = '';
  inputPin: boolean = false;
  menuOpen: boolean = false;
  note?: Note;

  isEditMode$: Observable<boolean>;
  isEditMode: boolean = false;

  @Input() data?: NoteEditDialogData;
  @ViewChild('form') form?: NgForm;
  @ViewChild('menuTrigger') menuTrigger?: MatMenuTrigger;

  @HostListener('document:click', ['$event'])
  clickedOut(event: MouseEvent) {
    if (this.menuOpen) {
      this.menuOpen = this.menuTrigger?.menuOpen ?? false;
      return;
    }
    if (this.eRef?.nativeElement) {
      if (
        !this.eRef?.nativeElement.contains(event.target) &&
        this.isEditMode === true
      ) {
        console.log('Native element: ', this.eRef.nativeElement);
        console.log('Event target: ', event.target);
        console.log('Clicked Out !');
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
      if (this.data.note.pinned) {
        this.inputPin = this.data.note.pinned;
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
            pinned: this.inputPin,
          })
        );
      } else {
        this.store.dispatch(
          createOrEditNote({
            title: this.inputTitle,
            content: this.inputTextarea,
            pinned: this.inputPin,
          })
        );
      }

      if (this.form) {
        this.form.reset();
      }
    }
  }

  onMenuTriggerClicked() {
    this.menuOpen = true;
  }

  onDeleteNote() {
    // this.store.dispatch(deleteNote({ id: this.note.id! }));
    // TODO Implement Delete for Edit Dialog / Disable button for New Note
  }

  onShowLabels() {
    // this.showLabels = true;
    // TODO Implement Labels on both Edit Dialog and New Note
  }

  onPinClicked() {
    this.inputPin = this.inputPin ? false : true;
  }
}
