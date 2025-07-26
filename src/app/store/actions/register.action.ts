import { createAction, props } from '@ngrx/store';
import { UserRegister } from '../../core/models/auth.interface';

export const RegisterAction = createAction(
  '[Register Page] Register User Successfully',
  props<UserRegister>(),
);
