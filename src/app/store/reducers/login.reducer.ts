import { createReducer, on } from '@ngrx/store';
import { LoginState } from '../state';
import { login, loginSuccessful } from '../actions';
import { error } from 'console';

const initialLoginState: LoginState = {
  user: null,
  loading: false,
  error: null,
};

export const loginReducer = createReducer(
  initialLoginState,
  on(login, (state) => ({ ...state, loading: true, error: null })),
  on(loginSuccessful, (state, { loginUser }) => ({
    ...state,
    user: loginUser,
    loading: false,
  })),
);
