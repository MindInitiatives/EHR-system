import { Injectable } from '@angular/core';
import *as HotelActions from '../hotel/store/action/action.actions';
import *as fromUserReducer from '../user/store/reducer/reducer.reducer';
import *as fromHotelSelector from '../hotel/store/selector/user.selectors';
import {createSelector, createFeatureSelector} from '@ngrx/store';
import {Dictionary} from '@ngrx/entity';
import {Store, select} from '@ngrx/store';
import {HotelState} from './../app.state';
// import { UserDetail } from '../models/user.model';
// import { addUser, updateUser } from '../user/store/action/action.actions';
import { UserState } from '../user/store/reducer/reducer.reducer';
import { HotelDetail } from '../models/hotel.model';

@Injectable({
  providedIn: 'root'
})
export class HotelService {
  // data : any
  public allHotels;
  private hotelById;
  status: string = "Checked In";

  // constructor(private store: Store<UserState>) { }

  constructor(private store: Store<HotelState> ) {
    this.allHotels = createSelector(fromHotelSelector.selectAll, (entities) => {
        return entities;
    });
    
    this.hotelById = createSelector(fromHotelSelector.selectEntities, 
        (entities: Dictionary<HotelDetail>, props:{id: number}) => {    
        return entities[props.id];
    });
}

public addHotel(data: HotelDetail) {
  data._id = new Date().getTime();
  this.store.dispatch(new HotelActions.AddHotel(data));
}

public list(){
  return this.store.pipe(select(this.allHotels));     
}

public getDetail(id: number) { 
  return this.store.pipe(select(this.hotelById, {id: id}));
}

public edit(id: number, changes: HotelDetail) { 
  this.store.dispatch(new HotelActions.UpdateHotel(id, changes));
} 


//   public addUser(data)  {
//     data._id = new Date().getTime();
//     this.store.dispatch(addUser(data));
//   }

//   updateUser(id : number, data : UserDetail)  {
//     this.store.dispatch(updateUser(id, data));
//   }

//   public edit(id: number, changes: todo) { 
//     this.store.dispatch(new TodoActions.UpdateTodo(id, changes));
// } 

//   storeCurrentData(userData){
//     sessionStorage.setItem('data', JSON.stringify(userData));
//     this.data = userData;
//   }

//   getCurrentData() {
//     const userData = sessionStorage.getItem('data');
//     this.data = userData;
//     return this.data;
//   }

//   removeCurrentData(){
//     this.data = null;
//     sessionStorage.removeItem('data');
//   }
}
