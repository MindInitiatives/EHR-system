import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EditUserComponent } from 'src/app/components/edit-user/edit-user.component';
import { RegisterUserComponent } from 'src/app/components/register-user/register-user.component';
import { UserDetailComponent } from 'src/app/components/user-detail/user-detail.component';
import { ViewUsersComponent } from 'src/app/components/view-users/view-users.component';

const routes: Routes = [
      {
    path:'register-user', component: RegisterUserComponent
      },
      {
        path:'user-details', component: UserDetailComponent
          },
          {
            path:'view-users', component: ViewUsersComponent
              },
              {
                path:'edit-user', component: EditUserComponent
                  },
              
              
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DefaultRoutingModule { }

