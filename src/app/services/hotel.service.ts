import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { addUser } from '../user/store/action/action.actions';
import { UserState } from '../user/store/reducer/reducer.reducer';

@Injectable({
  providedIn: 'root'
})
export class HotelService {

  constructor(private store: Store<UserState>) { }


  addUser(data)  {
    this.store.dispatch(addUser(data));
  }
}
