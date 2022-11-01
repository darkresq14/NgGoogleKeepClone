import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Store } from '@ngrx/store';
import { map, Observable, switchMap, take, catchError, of } from 'rxjs';
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
    return this.userUid$.pipe(
      take(1),
      switchMap((uid) => {
        return this.db.collection(uid!).snapshotChanges();
      }),
      map((docArray) =>
        docArray.map((doc) => {
          const data = doc.payload.doc.data() as Note;
          const id = doc.payload.doc.id;
          return { id, ...data };
        })
      )
    );
  }

  createOrEditNoteFirestore(note: Note) {
    return this.userUid$.pipe(
      take(1),
      switchMap((uid) => {
        if (note.id) {
          return this.db.collection(uid!).doc(note.id).set({
            title: note.title,
            content: note.content,
            date: new Date(),
          });
        }
        const noteToAdd = {
          title: note.title,
          content: note.content,
          type: 'normal',
          date: new Date(),
        };
        return this.db.collection(uid!).add(noteToAdd);
      }),
      catchError((err) => {
        return of(err);
      })
    );
  }

  deleteNoteFirestore(id: string) {
    return this.userUid$.pipe(
      take(1),
      switchMap((uid) => {
        return this.db.collection(uid!).doc(id).delete();
      })
    );
  }

  // createNoteFirestore(note: Note) {
  //   return this.userUid$.pipe(
  //     take(1),
  //     switchMap((uid) => {
  //       const noteToAdd = {
  //         title: note.title,
  //         content: note.content,
  //         type: 'normal',
  //         date: new Date(),
  //       };

  //       return this.db.collection(uid!).add(noteToAdd);
  //     })
  //   );
  // }
}
