import { Action, createAction, props } from '@ngrx/store';
import { UserDetail } from 'src/app/models/user.model';
import { Update, EntityMap, EntityMapOne, Predicate } from '@ngrx/entity';
import { HotelDetail } from 'src/app/models/hotel.model';

export const ADD_HOTEL = '[HOTEL] Add';
export const REMOVE_HOTEL = '[HOTEL] Remove';
export const UPDATE_HOTEL = '[HOTEL] Update';

export class AddHotel implements Action {
  readonly type = ADD_HOTEL;
  constructor(public payload: HotelDetail) { }
}
  
export class UpdateHotel implements Action {
  readonly type = UPDATE_HOTEL;
  constructor(public _id: number, public changes) { }
}

export type Actions = AddHotel | UpdateHotel;

// export const addUser = createAction(
//   '[User] Add User',
//   (user: UserDetail) => ({user})
// );

// export const updateUser = createAction(
//   '[User] Update User', 
//   props<{ update: Update<UserDetail> }>());

// export const selectUser = createAction(
//   '[Users Page] Select User', 
//   props<{ userId: string }>());


// export const loadUsers = createAction('[User/API] Load Users', props<{ users: UserDetail[] }>());
// export const setUser = createAction('[User/API] Set User', props<{ user: UserDetail }>());
// export const upsertUser = createAction('[User/API] Upsert User', props<{ user: UserDetail }>());
// export const addUsers = createAction('[User/API] Add Users', props<{ users: UserDetail[] }>());
// export const upsertUsers = createAction('[User/API] Upsert Users', props<{ users: UserDetail[] }>());
// export const updateUsers = createAction('[User/API] Update Users', props<{ updates: Update<UserDetail>[] }>());
// export const mapUser = createAction('[User/API] Map User', props<{ entityMap: EntityMapOne<UserDetail> }>());
// export const mapUsers = createAction('[User/API] Map Users', props<{ entityMap: EntityMap<UserDetail> }>());
// export const deleteUser = createAction('[User/API] Delete User', props<{ id: string }>());
// export const deleteUsers = createAction('[User/API] Delete Users', props<{ ids: string[] }>());
// export const deleteUsersByPredicate = createAction('[User/API] Delete Users By Predicate', props<{ predicate: Predicate<UserDetail> }>());
// export const clearUsers = createAction('[User/API] Clear Users');