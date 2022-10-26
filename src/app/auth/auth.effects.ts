// import { Injectable } from '@angular/core';
// import { Actions, createEffect, ofType } from '@ngrx/effects';
// import { switchMap, map } from 'rxjs';
// import { AuthActionTypes, LoginStart } from './auth.actions';

// @Injectable({
//   providedIn: 'root',
// })
// export class AuthEffects {
//   constructor(private actions$: Actions) {}

//   authLogin$ = createEffect(() => {
//     return this.actions$.pipe(
//       ofType(AuthActionTypes.LoginStart),
//       map(() => {
//         type: LoginStart;
//       })
//     );
//   });
// }
