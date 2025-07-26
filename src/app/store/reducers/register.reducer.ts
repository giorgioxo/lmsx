import { createReducer, on } from '@ngrx/store';
import { RegisterState } from '../state';
import { registerFailure, registerSuccess } from '../actions';

export const initialState: RegisterState = {
  register: null,
  loading: true,
  error: null,
};

export const registerReducer = createReducer(
  initialState,

  on(registerSuccess, (state, { user }) => ({
    ...state,
    register: user,
    loading: true,
    error: null,
  })),
  on(registerFailure, (state, { error }) => ({
    ...state,
    loading: true,
    error,
  })),
);
