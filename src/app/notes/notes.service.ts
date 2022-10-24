import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Store } from '@ngrx/store';
import { map, Observable, Subscription, take } from 'rxjs';
import { selectAuthUid } from '../auth/auth.selector';
import { startLoading } from '../shared/ui/ui.actions';
import { UiService } from '../shared/ui/ui.service';
import { State } from '../store/app.reducer';
import { Note } from './note/note.model';
import { createNote, setNotes } from './store/notes.actions';

@Injectable({
  providedIn: 'root',
})
export class NotesService {
  private fbSub: Subscription | undefined;

  userUid$: Observable<string | null>;
  userUid: string | null = null;

  constructor(
    private store: Store<State>,
    private db: AngularFirestore,
    private uiService: UiService
  ) {
    this.userUid$ = this.store.select(selectAuthUid);
  }

  fetchPersonalNotes() {
    this.store.dispatch(startLoading());
    this.userUid$.pipe(take(1)).subscribe((res) => (this.userUid = res));
    if (this.userUid) {
      this.fbSub = this.db
        .collection(this.userUid)
        .snapshotChanges()
        .pipe(
          map((docArray) =>
            docArray.map((doc) => {
              const data = doc.payload.doc.data() as Note;
              const id = doc.payload.doc.id;
              return { id, ...data };
            })
          )
        )
        .subscribe({
          next: (res) => {
            this.store.dispatch(setNotes({ notes: res }));
          },
          error: (err) => {
            this.uiService.showSnackbar(err.message, '', 3000);
          },
        });
    }
  }

  addNoteToFirestore(note: Note) {
    this.userUid$.pipe(take(1)).subscribe((res) => (this.userUid = res));

    const noteToAdd = {
      title: note.title,
      content: note.content,
      type: 'normal',
      date: new Date(),
    };

    if (this.userUid) {
      this.db.collection(this.userUid).add(noteToAdd);
    }
  }

  finishedEditingNote(title: string, content: string) {
    this.addNoteToFirestore({ title, content });
    this.store.dispatch(createNote({ title, content }));
  }

  cancelSubscriptions() {
    if (this.fbSub) {
      this.fbSub.unsubscribe();
    }
  }
}
