import * as fromNav from '../navigation/nav.reducer';
import * as fromAuth from '../auth/auth.reducer';

export interface State {
  nav: fromNav.NavState;
  auth: fromAuth.AuthState;
}

export const reducers = {
  nav: fromNav.navReducer,
  auth: fromAuth.authReducer,
};
