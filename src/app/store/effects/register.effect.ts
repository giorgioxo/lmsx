import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { AuthService } from '../../core/services/auth.service';
import { RegisterAction, registerSuccess, registerFailure } from '../actions';
import { catchError, map, mergeMap, of } from 'rxjs';

@Injectable()
export class RegisterEffects {
  private actions$ = inject(Actions);
  private authService = inject(AuthService);

  register$ = createEffect(() =>
    this.actions$.pipe(
      ofType(RegisterAction),
      mergeMap(({ user }) =>
        this.authService.register(user).pipe(
          map((response) => registerSuccess({ message: response.message })),
          catchError((error) =>
            of(
              registerFailure({
                error: error.message || 'Registration failed',
              }),
            ),
          ),
        ),
      ),
    ),
  );
}
