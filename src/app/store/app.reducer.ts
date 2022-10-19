import * as fromNav from '../navigation/nav.reducer';

export interface State {
  nav: fromNav.NavState;
}

export const reducers = {
  nav: fromNav.navReducer,
};
