import { createAction, props } from '@ngrx/store';
import { UserSuccessfullyLogin } from '../../core/models/auth.interface';

export const loginSuccessful = createAction(
  '[Login Api] Login Successful',
  props<{ loginUser: UserSuccessfullyLogin }>(),
);
