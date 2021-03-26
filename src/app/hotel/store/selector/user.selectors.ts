import {createFeatureSelector} from '@ngrx/store';
import * as fromHotel from '../reducer/reducer.reducer';

export const getHotelState = createFeatureSelector<fromHotel.HotelState>('hotels');      

export const {selectAll, selectEntities, selectIds, selectTotal} = fromHotel.adapter.getSelectors(getHotelState);
