import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { State } from '../store/app.reducer';
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
  // notes: Note[] = [];
  breakpoint = 2;

  constructor(private store: Store<State>) {
    // TODO: Not getting triggered on user change unless refresh
    this.notes$ = this.store.select(selectNotesNotes);
  }

  ngOnInit(): void {
    // this.store
    //   .select(selectNotesNotes)
    //   .subscribe((data) => (this.notes = [...data]));

    this.store.dispatch(getNotes());

    // this.breakpoint = window.innerWidth <= 400 ? 1 : 6;
  }

  onResize(event: any) {
    // this.breakpoint = event.target.innerWidth <= 400 ? 1 : 6;
  }

  //TODO: add drag and drop directive

  // drop(event: CdkDragDrop<Note[]>) {
  //   console.log('Drag and Drop: ', event);
  //   moveItemInArray(this.notes, event.previousIndex, event.currentIndex);
  // }
}
