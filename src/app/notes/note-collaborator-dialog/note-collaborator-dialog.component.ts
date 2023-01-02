import { Component, OnInit, OnDestroy, Inject } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { map, Observable, startWith, switchMap, Subscription } from 'rxjs';
import { User } from 'src/app/auth/auth.model';
import { selectAuthUid, selectAuthUsers } from 'src/app/auth/auth.selector';
import { State } from 'src/app/store/app.reducer';
import { Note } from '../note/note.model';

@Component({
  selector: 'app-note-collaborator-dialog',
  templateUrl: './note-collaborator-dialog.component.html',
  styleUrls: ['./note-collaborator-dialog.component.css'],
})
export class NoteCollaboratorDialogComponent implements OnInit, OnDestroy {
  loggedInUserUid$: Observable<string | null>;
  loggedInUserUid: string | null = null;
  uidSub: Subscription;

  users$: Observable<User[]>;
  filteredUsers$: Observable<User[]>;

  myControl = new FormControl('');

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { note: Note },
    private store: Store<State>
  ) {
    this.loggedInUserUid$ = this.store.select(selectAuthUid);
    this.uidSub = this.loggedInUserUid$.subscribe(
      (uid) => (this.loggedInUserUid = uid)
    );

    this.users$ = this.store.select(selectAuthUsers);

    this.filteredUsers$ = this.myControl.valueChanges.pipe(
      startWith(''),
      switchMap((email) => {
        if (email) {
          return this._filter(email as string);
        } else {
          return this.users$.pipe(
            map((users) =>
              users.filter((user) => user.uid !== this.loggedInUserUid)
            )
          );
        }
      })
    );
  }

  ngOnInit(): void {}

  private _filter(email: string): Observable<User[]> {
    const filterValue = email.toLowerCase();
    return this.users$.pipe(
      map((users) =>
        users.filter(
          (user) =>
            user.email!.toLowerCase().includes(filterValue) &&
            user.uid !== this.loggedInUserUid
        )
      )
    );
  }

  ngOnDestroy(): void {
    this.uidSub.unsubscribe();
  }
}
