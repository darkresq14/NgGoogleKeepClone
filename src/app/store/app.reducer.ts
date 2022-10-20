import * as fromNav from '../navigation/nav.reducer';
import * as fromAuth from '../auth/auth.reducer';
import * as fromNotes from '../notes/store/notes.reducer';

export interface State {
  nav: fromNav.NavState;
  auth: fromAuth.AuthState;
  notes: fromNotes.NotesState;
}

export const reducers = {
  nav: fromNav.navReducer,
  auth: fromAuth.authReducer,
  notes: fromNotes.notesReducer,
};
