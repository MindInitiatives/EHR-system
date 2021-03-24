import {Action, createReducer, on} from '@ngrx/store';
import { UserDetail } from 'src/app/models/user.model';
import * as UserActions from '../action/action.actions';

export const userFeatureKey = 'user';

export interface UserState {
  users: UserDetail[];
}

export const initialState: UserState = {
  users: []
};

export const userReducer = createReducer(
  initialState,
  on(UserActions.addUser,
    (state: UserState, {user}) =>
      ({...state,
        users: [...state.users, user]
      }))
);

export function reducer(state: UserState | undefined, action: Action): any {
  return userReducer(state, action);
}