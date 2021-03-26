import { Injectable } from '@angular/core';
import *as UserActions from '../user/store/action/action.actions';
import *as fromUserReducer from '../user/store/reducer/reducer.reducer';
import *as fromUserSelector from '../user/store/selector/user.selectors';
import {createSelector, createFeatureSelector} from '@ngrx/store';
import {Dictionary} from '@ngrx/entity';
import {Store, select} from '@ngrx/store';
import {AppState} from './../app.state';
import { UserDetail } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  public allUsers;
  private userById;
  status: string = "Checked In";

  constructor(private store: Store<AppState> ) {
    this.allUsers = createSelector(fromUserSelector.selectAll, (entities) => {
        return entities;
    });
    
    this.userById = createSelector(fromUserSelector.selectEntities, 
        (entities: Dictionary<UserDetail>, props:{id: number}) => {    
        return entities[props.id];
    });
}

public addUser(data: UserDetail) {
  data._id = new Date().getTime();
  data.status = this.status;  
  this.store.dispatch(new UserActions.AddUser(data));
}

public list(){
  return this.store.pipe(select(this.allUsers));     
}

public remove(id: number) { 
  this.store.dispatch(new UserActions.RemoveUser(id));
}

public getDetail(id: number) { 
  return this.store.pipe(select(this.userById, {id: id}));
}

public edit(id: number, changes: UserDetail) { 
  this.store.dispatch(new UserActions.UpdateUser(id, changes));
} 

}
