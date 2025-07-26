import { createReducer, on } from '@ngrx/store';
import { RegisterState } from '../state';
import { registerFailure, registerSuccess } from '../actions';

export const initialState: RegisterState = {
  message: null,
  loading: false,
  error: null,
};

export const registerReducer = createReducer(
  initialState,

  on(registerSuccess, (state, { message }) => ({
    ...state,
    message,
    loading: false,
    error: null,
  })),
  on(registerFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),
);
