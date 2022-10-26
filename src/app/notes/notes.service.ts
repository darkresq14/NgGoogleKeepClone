import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Store } from '@ngrx/store';
import { map, Observable, switchMap, take } from 'rxjs';
import { selectAuthUid } from '../auth/auth.selector';
import { UiService } from '../shared/ui/ui.service';
import { State } from '../store/app.reducer';
import { Note } from './note/note.model';
import { createNote } from './store/notes.actions';

@Injectable({
  providedIn: 'root',
})
export class NotesService {
  userUid$: Observable<string | null>;

  constructor(
    private store: Store<State>,
    private db: AngularFirestore,
    private uiService: UiService
  ) {
    this.userUid$ = this.store.select(selectAuthUid);
  }

  fetchPersonalNotes() {
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

  addNoteToFirestore(note: Note) {
    this.userUid$.pipe(take(1)).subscribe((uid) => {
      const noteToAdd = {
        title: note.title,
        content: note.content,
        type: 'normal',
        date: new Date(),
      };

      if (uid) {
        this.db.collection(uid).add(noteToAdd);
      } else {
        this.uiService.showSnackbar('Error saving Note', '', 3000);
      }
    });
  }

  finishedEditingNote(title: string, content: string) {
    this.addNoteToFirestore({ title, content });
    this.store.dispatch(createNote({ title, content }));
  }
}
