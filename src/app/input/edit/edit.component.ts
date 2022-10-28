import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { NotesService } from 'src/app/notes/notes.service';
import { setInputEditMode } from 'src/app/shared/ui/ui.actions';
import { NgForm } from '@angular/forms';
import { State } from 'src/app/store/app.reducer';
import { DialogData } from 'src/app/notes/note-edit-dialog/note-edit-dialog.component';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css'],
})
export class EditComponent implements OnInit {
  inputTextarea: string = '';
  inputTitle: string = '';
  @Input() data?: DialogData;
  @ViewChild('form') form?: NgForm;

  constructor(
    private store: Store<State>,
    private notesService: NotesService
  ) {}

  ngOnInit(): void {
    if (this.data?.note) {
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
