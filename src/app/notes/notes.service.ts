import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Store } from '@ngrx/store';
import { State } from '../store/app.reducer';
import { Note } from './note/note.model';

@Injectable({
  providedIn: 'root',
})
export class NotesService {
  constructor(private store: Store<State>, private db: AngularFirestore) {}

  addNoteToFirebase(note: Note) {}

  finishedEditingNote() {}
}
