import { createFeatureSelector, createSelector } from '@ngrx/store';
import { RegisterState } from '../state';

export const selectRegisterState =
  createFeatureSelector<RegisterState>('register');

export const selectRegisterUser = createSelector(
  selectRegisterState,
  (state) => state.message,
);

export const selectRegisterLoading = createSelector(
  selectRegisterState,
  (state) => state.loading,
);

export const selectRegisterError = createSelector(
  selectRegisterState,
  (state) => state.error,
);
