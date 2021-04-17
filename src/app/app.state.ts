
import { UserDetail } from '../app/models/user.model'

export interface AppState {
  readonly hotelSystem: UserDetail[];
}

export interface HotelState {
  readonly hotelSystem: HotelState[];
}
