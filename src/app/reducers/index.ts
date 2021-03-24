import {
    ActionReducer,
    ActionReducerMap,
    createFeatureSelector,
    createSelector,
    MetaReducer
  } from '@ngrx/store';
  import { environment } from '../../environments/environment';
  import * as fromUsers from '../user/store/reducer/reducer.reducer';
  
  
  export interface State {
    users: fromUsers.UserState
  }
  
  export const reducers: ActionReducerMap<State> = {
    users: fromUsers.userReducer
  };
  
  
  export const metaReducers: MetaReducer<State>[] = !environment.production ? [] : [];
  