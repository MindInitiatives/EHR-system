import { EntityAdapter, createEntityAdapter, EntityState } from '@ngrx/entity';
import {Action, createFeatureSelector, createReducer, on} from '@ngrx/store';
import { UserDetail } from 'src/app/models/user.model';
import * as UserActions from '../action/action.actions';


export interface UserState extends EntityState<UserDetail> { }

export const adapter : EntityAdapter<UserDetail> = createEntityAdapter<UserDetail>({ 
    // In this case this would be optional since primary key is id
  selectId: item => item._id
});

const initialState : UserDetail = <UserDetail>{ };

export const initialUserState : UserState = adapter.getInitialState( );

export function userReducers(state = initialUserState, action: UserActions.Actions) {
    switch(action.type) {
        case UserActions.ADD_USER:
            return adapter.addOne(action.payload, state);
        case UserActions.UPDATE_USER:
            if(state.entities[action._id] === undefined) {
                return state;
            }            
            return adapter.updateOne({
                id: action._id,
                changes: action.changes,
            }, state);
        case UserActions.REMOVE_USER:
            return adapter.removeOne(action.id, state);
        default:
            return state;
    }
}

export const getUserState = createFeatureSelector<UserState>('users');      

export const {selectAll, selectEntities, selectIds, selectTotal} = adapter.getSelectors(getUserState);


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