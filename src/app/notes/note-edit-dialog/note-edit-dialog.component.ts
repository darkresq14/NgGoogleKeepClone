import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Note } from '../note/note.model';

export interface DialogData {
  note: Note;
}

@Component({
  selector: 'app-note-edit-dialog',
  templateUrl: './note-edit-dialog.component.html',
  styleUrls: ['./note-edit-dialog.component.css'],
})
export class NoteEditDialogComponent implements OnInit {
  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogData) {}

  ngOnInit(): void {}
}
