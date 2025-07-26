import { createAction, props } from '@ngrx/store';
import { UserSuccessfullyLogin } from '../../core/models/auth.interface';

export const registerSuccess = createAction(
  '[Register API] Register Success',
  props<{ user: any }>(),
);

export const registerFailure = createAction(
  '[Register API] Register Failure',
  props<{ error: string }>(),
);
