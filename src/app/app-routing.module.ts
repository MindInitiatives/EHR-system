import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DefaultComponent } from './layouts/default/default.component';

const routes: Routes = [
  // { path: '', redirectTo: '/information-management', pathMatch: 'full' },
  {
    path: '',
    component: DefaultComponent,
    loadChildren: () =>
      import(`./layouts/default/default.module`).then(
        (m) => m.DefaultModule
      ),
  }
// { path: '**', redirectTo: '/login', pathMatch: 'full' }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
