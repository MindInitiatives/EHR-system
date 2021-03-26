import {createFeatureSelector} from '@ngrx/store';
import * as fromUser from '../reducer/reducer.reducer';

export const getUserState = createFeatureSelector<fromUser.UserState>('users');      

export const {selectAll, selectEntities, selectIds, selectTotal} = fromUser.adapter.getSelectors(getUserState);
