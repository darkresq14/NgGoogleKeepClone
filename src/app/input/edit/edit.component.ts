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

  @Input() data?: DialogData;
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
      if (this.data.note.category) {
        this.noteType = this.data.note.category;
      }
      if (this.data.note.content) {
        this.inputTextarea = this.data.note.content;
      }
      if (this.data.note.pinned) {
        this.inputPin = this.data.note.pinned;
      }
    }
  }

  ngOnChanges(): void {
    //console.log("Picking note type");
    switch (this.noteType) {
      case "list": {
        //console.log("Type is list");
        this.todoList = this.getListItems();
        break;
      }
      case "normal": {
        //console.log("Type is text");
        this.inputTextarea = this.data?.note.content || "";
        break;
      }
      default: { }
    }
  }

  getListItems(): string[] {
    let itemList = this.data?.note.content?.split('\n');
    return itemList ? itemList : [];
  }

  getNoteContent(): string {
    if (this.inputTextarea) {
      //console.log("GetNoteContent: ", this.inputTextarea);
      return this.inputTextarea;
    }
    else if (this.todoList.length > 1) {
      let initVal = this.todoList.at(0) || "";
      return this.todoList.splice(1).reduce((acc, val) => (`${acc}\n${val}`), initVal); //concatenates with \n separator
    }
    else return "";
  }

  disableEditMode() {
    this.store.dispatch(setInputEditMode({ isInputEditMode: false }));
    if (this.inputTitle || this.inputTextarea) {
      if (this.note) {
        this.store.dispatch(
          createOrEditNote({
            ...this.note,
            category: this.noteType,
            title: this.inputTitle,
            content: this.inputTextarea,
            pinned: this.inputPin,
          })
        );
      } else {
        this.store.dispatch(
          createOrEditNote({
            category: this.noteType,
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
