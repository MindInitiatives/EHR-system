import { EntityAdapter, createEntityAdapter, EntityState } from '@ngrx/entity';
import {Action, createFeatureSelector, createReducer, on} from '@ngrx/store';
import { HotelDetail } from 'src/app/models/hotel.model';
import * as HotelActions from '../action/action.actions';


export interface HotelState extends EntityState<HotelDetail> { }

export const adapter : EntityAdapter<HotelDetail> = createEntityAdapter<HotelDetail>({ 
    // In this case this would be optional since primary key is id
  selectId: item => item._id
});

const initialState : HotelDetail = <HotelDetail>{ };

export const initialHotelState : HotelState = adapter.getInitialState( );

export function hotelReducers(state = initialHotelState, action: HotelActions.Actions) {
    switch(action.type) {
        case HotelActions.ADD_HOTEL:
            return adapter.addOne(action.payload, state);
        case HotelActions.UPDATE_HOTEL:
            if(state.entities[action._id] === undefined) {
                return state;
            }            
            return adapter.updateOne({
                id: action._id,
                changes: action.changes,
            }, state);
        default:
            return state;
    }
}

export const getHotelState = createFeatureSelector<HotelState>('hotels');      

export const {selectAll, selectEntities, selectIds, selectTotal} = adapter.getSelectors(getHotelState);


// export const userFeatureKey = 'user';

// export const ENTITY_FEATURE_KEY = "user";

// export interface State extends EntityState<UserDetail> {
//   // additional entities state properties
//   selectedUserId: number | null;
  
// } 

// export function selectUserId(a: UserDetail): string {
//   //In this case this would be optional since primary key is id
//   return a._id;
// }
 
// export const adapter: EntityAdapter<UserDetail> = createEntityAdapter<UserDetail>({
//   // In this case this would be optional since primary key is id
//   selectId: item => item._id
// });
 
// export const initialState: State = adapter.getInitialState({
//   // additional entity state properties
//   selectedUserId: null,
// });



// export interface UserState {
//   users: UserDetail[];
// }

// const userReducer = createReducer(
//   initialState,
//   on(UserActions.addUser, (state, { user }) => {
//     return adapter.addOne(user, state)
//   }),
//   on(UserActions.setUser, (state, { user }) => {
//     return adapter.setOne(user, state)
//   }),
//   on(UserActions.upsertUser, (state, { user }) => {
//     return adapter.upsertOne(user, state);
//   }),
//   on(UserActions.addUsers, (state, { users }) => {
//     return adapter.addMany(users, state);
//   }),
//   on(UserActions.upsertUsers, (state, { users }) => {
//     return adapter.upsertMany(users, state);
//   }),
//   on(UserActions.updateUser, (state, { update }) => {
//     return adapter.updateOne(update, state);
//   }),
//   on(UserActions.updateUsers, (state, { updates }) => {
//     return adapter.updateMany(updates, state);
//   }),
//   on(UserActions.mapUser, (state, { entityMap }) => {
//     return adapter.mapOne(entityMap, state);
//   }),
//   on(UserActions.mapUsers, (state, { entityMap }) => {
//     return adapter.map(entityMap, state);
//   }),
//   on(UserActions.deleteUser, (state, { id }) => {
//     return adapter.removeOne(id, state);
//   }),
//   on(UserActions.deleteUsers, (state, { ids }) => {
//     return adapter.removeMany(ids, state);
//   }),
//   on(UserActions.deleteUsersByPredicate, (state, { predicate }) => {
//     return adapter.removeMany(predicate, state);
//   }),
//   on(UserActions.loadUsers, (state, { users }) => {
//     return adapter.setAll(users, state);
//   }),
//   on(UserActions.clearUsers, state => {
//     return adapter.removeAll({ ...state, selectedUserId: null });
//   })

//   );
 
// export function reducer(state: State | undefined, action: Action) {
//   return userReducer(state, action);
// }
 
// export const getSelectedUserId = (state: State) => state.selectedUserId;
 
// // get the selectors
// const {
//   selectIds,
//   selectEntities,
//   selectAll,
//   selectTotal,
// } = adapter.getSelectors();
 
// // select the array of user ids
// export const selectUserIds = selectIds;
 
// // select the dictionary of user entities
// export const selectUserEntities = selectEntities;
 
// // select the array of users
// export const selectAllUsers = selectAll;
 
// // select the total user count
// export const selectUserTotal = selectTotal;

// export const initialState: UserState = {
//   users: []
  
// };



// export const adapter: EntityAdapter<UserDetail> = createEntityAdapter<UserDetail>({
//   // In this case this would be optional since primary key is id
//   selectId: item => item._id
// });


// export const userReducer = createReducer(
//   initialState,
//   on(UserActions.selectUser, (state, { userId }) => {
//     return { ...state, selectedUserId: userId };
//   }),
//   on(UserActions.addUser,
//     (state: UserState, {user}) =>
//       ({...state,
//         users: [...state.users, user]
//       })),
//   on(UserActions.updateUser, (state, { update }) => {
//     return adapter.updateOne(update, state);
//   })
// );

 
// export const getSelectedUserId = (state: State) => state.selectedUserId;
 
// // get the selectors
// const {
//   selectIds,
//   selectEntities,
//   selectAll,
//   selectTotal,
// } = adapter.getSelectors();
 
// // select the array of user ids
// export const selectUserIds = selectIds;
 
// // select the dictionary of user entities
// export const selectUserEntities = selectEntities;
 
// // select the array of users
// export const selectAllUsers = selectAll;
 
// // select the total user count
// export const selectUserTotal = selectTotal;

// export function reducer(state: UserState | undefined, action: Action): any {
//   return userReducer(state, action);
// }