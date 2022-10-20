import * as fromUi from '../shared/ui/ui.reducer';
import * as fromAuth from '../auth/auth.reducer';
import * as fromNotes from '../notes/store/notes.reducer';

export interface State {
  ui: fromUi.UiState;
  auth: fromAuth.AuthState;
  notes: fromNotes.NotesState;
}

export const reducers = {
  ui: fromUi.uiReducer,
  auth: fromAuth.authReducer,
  notes: fromNotes.notesReducer,
};
