import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DefaultComponent } from './layouts/default/default.component';
import { InformationManagementComponent } from './modules/information-management/information-management.component';
import { LoginComponent } from './modules/login/login.component';
import { RoomManagementComponent } from './modules/room-management/room-management.component';
import { UserManagementComponent } from './modules/user-management/user-management.component';

const routes: Routes = [
  // { path: '', redirectTo: '/login', pathMatch: 'full' },
  {path: 'login', component: LoginComponent},
  {path: '',
  component: DefaultComponent, 
  children: [{
    path: 'user-management',
    component: UserManagementComponent
  }, {
    path: 'room-management',
    component: RoomManagementComponent
  }, {
    path: 'information-management',
    component: InformationManagementComponent
  }]
},
// { path: '**', redirectTo: '/login', pathMatch: 'full' }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
