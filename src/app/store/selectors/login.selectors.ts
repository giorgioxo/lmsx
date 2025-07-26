import { createFeatureSelector, createSelector } from '@ngrx/store';
import { LoginState } from '../state/login.state';

export const selectLoginFeature = createFeatureSelector<LoginState>('auth');

export const selectUser = createSelector(
  selectLoginFeature,
  (state) => state.user,
);
