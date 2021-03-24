import { createAction, props } from '@ngrx/store';
import { UserDetail } from 'src/app/models/user.model';

export const addUser = createAction(
  '[User] Add User',
  (user: UserDetail) => ({user})
);