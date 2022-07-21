import { createAction, props } from '@ngrx/store';
import { IUser } from 'src/app/resources/interfaces/user.interface';

export const login = createAction(
  "[Login Page] User Login",
  props<{ user: IUser }>()
);

export const logout = createAction(
  "[Top Menu] Logout"
);
