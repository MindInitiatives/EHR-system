import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatInputModule } from '@angular/material/input'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DefaultModule } from './layouts/default/default.module';
import { MatIconModule } from '@angular/material/icon'
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBarModule} from '@angular/material/snack-bar';
import {HttpClientModule} from '@angular/common/http';
import { MetaReducer, State, StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from 'src/environments/environment';
import { UserDetailComponent } from './components/user-detail/user-detail.component';
import { userReducers } from './user/store/reducer/reducer.reducer';
import { RegisterUserComponent } from './components/register-user/register-user.component';
import { ViewUsersComponent } from './components/view-users/view-users.component';
import { EditUserComponent } from './components/edit-user/edit-user.component';
import { CreateRoomComponent } from './components/create-room/create-room.component';
import { ViewRoomsComponent } from './components/view-rooms/view-rooms.component';
import { RoomDetailComponent } from './components/room-detail/room-detail.component';

// export const metaReducers: MetaReducer<State>[] = !environment.production ? [storeFreeze]: [];

@NgModule({
  declarations: [
    AppComponent,
    CreateRoomComponent,
    ViewRoomsComponent,
    RoomDetailComponent
  ],
  imports: [
    BrowserModule,
    MatFormFieldModule,
    MatInputModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    DefaultModule,
    MatButtonModule,
    MatIconModule,
    MatSnackBarModule,
    HttpClientModule,
    FormsModule, 
    StoreModule.forRoot({
      users: userReducers
    }),
    StoreDevtoolsModule.instrument({
      maxAge: 25, // Retains last 25 state
    }),
    // StoreModule.forRoot(reducers, { metaReducers }),
    !environment.production ? StoreDevtoolsModule.instrument() : [],
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
