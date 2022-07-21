import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector, createReducer,
  createSelector,
  MetaReducer, on
} from '@ngrx/store';
import { IUser } from 'src/app/resources/interfaces/user.interface';
import { AuthActions } from '../login-types';


export interface AuthState {
  user: any
}

export const initialAuthState: AuthState = {
  user: undefined
};

export const authReducer = createReducer(

  initialAuthState,

  on(AuthActions.login, (state, action) => {
    return {
      user: action.user
    }
  }),

  on(AuthActions.logout, (state, action) => ({
    user: undefined
  }))
);
