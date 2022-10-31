import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { State } from '../store/app.reducer';
import { NoteEditDialogComponent } from './note-edit-dialog/note-edit-dialog.component';
import { Note } from './note/note.model';
import { getNotes } from './store/notes.actions';
import { selectNotesNotes } from './store/notes.selector';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.css'],
})
export class NotesComponent implements OnInit {
  notes$: Observable<Note[]>;
  notes: Note[] = [];
  breakpoint = 2;

  constructor(private store: Store<State>, private dialog: MatDialog) {
    this.notes$ = this.store.select(selectNotesNotes);
  }

  ngOnInit(): void {
    this.store
      .select(selectNotesNotes)
      .subscribe((data) => (this.notes = [...data]));

    this.store.dispatch(getNotes());

    // this.breakpoint = window.innerWidth <= 400 ? 1 : 6;
  }

  onResize(event: any) {
    // this.breakpoint = event.target.innerWidth <= 400 ? 1 : 6;
  }

  //TODO: add drag and drop directive

  drop(event: CdkDragDrop<Note[]>) {
    console.log('Drag and Drop: ', event);
    moveItemInArray(this.notes, event.previousIndex, event.currentIndex);
  }

  openEditDialog(note: Note) {
    this.dialog.open(NoteEditDialogComponent, {
      data: { note: note },
      panelClass: 'custom-dialog-container',
    });
  }
}
