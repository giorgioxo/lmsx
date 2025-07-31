import { createAction, props } from '@ngrx/store';

export const resetPassword = createAction(
  '[Password Reset Page] Reset Password',
  props<any>(),
);
