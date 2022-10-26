import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { State } from '../store/app.reducer';
import { Note } from './note/note.model';
import { NotesService } from './notes.service';
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

  constructor(private store: Store<State>, private notesService: NotesService) {
    this.notes$ = this.store.select(selectNotesNotes);
  }

  ngOnInit(): void {
    this.store
      .select(selectNotesNotes)
      .subscribe((data) => (this.notes = [...data]));
    this.store.dispatch(getNotes());

    // this.notesService.fetchPersonalNotes();
  }

  //TODO: add drag and drop directive

  drop(event: CdkDragDrop<Note[]>) {
    console.log('Drag and Drop: ', event);
    moveItemInArray(this.notes, event.previousIndex, event.currentIndex);
  }
}
