import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { AuthService } from '../../core/services/auth.service';
import { login } from '../actions/login.action';
import { loginSuccessful } from '../actions/login-api.action';
import { catchError, map, mergeMap, of } from 'rxjs';

export const loginEffect = createEffect(() => {
  const actions$ = inject(Actions);
  const authService = inject(AuthService);

  return actions$.pipe(
    ofType(login),
    mergeMap(({ username, password }) =>
      authService.login(username, password).pipe(
        map((response) => loginSuccessful({ loginUser: response })),
        catchError((error) => {
          // აქ შეგიძლია error action-იც დააბრუნო
          return of({ type: '[Login Api] Login Failed', error });
        }),
      ),
    ),
  );
});
