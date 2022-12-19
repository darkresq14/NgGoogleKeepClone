import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Store } from '@ngrx/store';
import { map, Observable, switchMap, take, combineLatest, first } from 'rxjs';
import { selectAuthUid } from '../auth/auth.selector';
import { State } from '../store/app.reducer';
import { Note } from './note/note.model';

@Injectable({
  providedIn: 'root',
})
export class NotesService {
  userUid$: Observable<string | null>;

  constructor(private store: Store<State>, private db: AngularFirestore) {
    this.userUid$ = this.store.select(selectAuthUid);
  }

  fetchPersonalNotesFirestore() {
    return combineLatest([
      this.userUid$,
      this.db.collection<Note[]>('notes').valueChanges({ idField: 'id' }),
    ]).pipe(
      map(([uid, notes]) => {
        if (uid) {
          return notes.filter(
            (note: Note) =>
              note.owner === uid || note.collaborators?.includes(uid!)
          );
        } else {
          return new Error('You are not logged in.');
        }
      })
    );
  }

  createOrEditNoteFirestore(note: Note) {
    return this.userUid$.pipe(
      take(1),
      switchMap((uid) => {
        if (note.id) {
          return this.db
            .collection('notes')
            .doc(note.id)
            .set({
              title: note.title,
              owner: note.owner,
              content: note.content,
              labels: note.labels ? note.labels : [],
              collaborators: note.collaborators ? note.collaborators : [],
              pinned: note.pinned ? note.pinned : false,
              background: note.background ? note.background : 'Default',
              date: new Date(),
            });
        }
        const noteToAdd = {
          title: note.title,
          owner: uid,
          content: note.content,
          labels: note.labels ? note.labels : [],
          collaborators: note.collaborators ? note.collaborators : [],
          pinned: note.pinned ? note.pinned : false,
          background: note.background ? note.background : 'Default',
          type: 'normal',
          date: new Date(),
        };
        return this.db.collection('notes').add(noteToAdd);
      })
    );
  }

  deleteNoteFirestore(id: string) {
    return combineLatest([
      this.userUid$,
      this.db.collection('notes').doc<Note>(id).valueChanges(),
    ]).pipe(
      first(),
      map(([uid, note]) => {
        if (note!.owner === uid) {
          console.log('Deleted');
          return this.db.collection('notes').doc(id).delete();
        } else {
          return new Error('You are not the owner of this note.');
        }
      })
    );
  }

  // TODO: Check why Redux fires twice on every modification
  // because we are manually subscribed to changes and also AngularFirestore is automatically subscribed to changes
}
