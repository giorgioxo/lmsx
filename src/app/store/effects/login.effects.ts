import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { AuthService } from '../../core/services/auth.service';
import { login } from '../actions/login.action';
import { loginSuccessful } from '../actions/login-api.action';
import { catchError, map, mergeMap, of } from 'rxjs';

@Injectable()
export class LoginEffects {
  private actions$ = inject(Actions);
  private authService = inject(AuthService);

  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(login),
      mergeMap(({ username, password }) =>
        this.authService.login(username, password).pipe(
          map((response) => loginSuccessful({ loginUser: response })),
          catchError((error) =>
            of({ type: '[Login Api] Login Failed', error }),
          ),
        ),
      ),
    ),
  );
}
