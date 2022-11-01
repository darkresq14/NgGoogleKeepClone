import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatMenuTrigger } from '@angular/material/menu';
import { Store } from '@ngrx/store';
import { State } from 'src/app/store/app.reducer';
import { NoteEditDialogComponent } from '../note-edit-dialog/note-edit-dialog.component';
import { deleteNote } from '../store/notes.actions';
import { Note } from './note.model';

@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.css'],
})
export class NoteComponent implements OnInit {
  @Input() note!: Note;
  @ViewChild('menuTrigger') menuTrigger?: MatMenuTrigger;

  constructor(private dialog: MatDialog, private store: Store<State>) {}

  ngOnInit(): void {}

  openEditDialog(note: Note) {
    if (!this.menuTrigger?.menuOpen) {
      this.dialog.open(NoteEditDialogComponent, {
        data: { note: note },
        panelClass: 'custom-dialog-container',
      });
    }
  }

  onDeleteNote() {
    this.store.dispatch(deleteNote({ id: this.note.id! }));
  }

  //TODO: Merge Edit and Note Component
}
