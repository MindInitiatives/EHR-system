import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SharedModule} from '../../shared/shared.module'
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatDividerModule } from '@angular/material/divider';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatCardModule } from '@angular/material/card'
import { MatIconModule } from '@angular/material/icon'
import { MatToolbarModule } from '@angular/material/toolbar'
import { MatDialogModule } from '@angular/material/dialog'
import { MatSelectModule } from '@angular/material/select'
import { MatButtonModule } from '@angular/material/button'
import { MatButtonToggleModule } from '@angular/material/button-toggle'
import { MatPaginatorModule } from '@angular/material/paginator'
import { MatSortModule } from '@angular/material/sort'
import { MatTableModule } from '@angular/material/table'
import { MatTableResponsiveModule } from 'src/app/shared/widgets/mat-table-responsive/mat-table-responsive.module';
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatInputModule } from '@angular/material/input'
import { MatRadioModule } from '@angular/material/radio'
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner'
import { HotelService } from '../../services/hotel.service'
import { ValidateService } from '../../services/validate.service'
import {MatDatepickerModule} from '@angular/material/datepicker';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import {HttpClientModule} from '@angular/common/http';
import { DefaultComponent } from './default.component';
import { StoreModule } from '@ngrx/store';
// import { userFeatureKey, reducer } from 'src/app/user/store/reducer/reducer.reducer';
import { EditUserComponent } from 'src/app/components/edit-user/edit-user.component';
import { EditModalComponent, ViewUsersComponent } from 'src/app/components/view-users/view-users.component';
import { UserDetailComponent } from 'src/app/components/user-detail/user-detail.component';
import { RegisterUserComponent } from 'src/app/components/register-user/register-user.component';
import { DefaultRoutingModule } from './default.routing';
import { HotelInfomationComponent } from 'src/app/components/hotel-infomation/hotel-infomation.component';



@NgModule({
  declarations: [
    DefaultComponent,
    EditUserComponent,
    ViewUsersComponent,
    UserDetailComponent,
    RegisterUserComponent,
    EditModalComponent,
    HotelInfomationComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    SharedModule,
    MatSidenavModule,
    MatDividerModule,
    FlexLayoutModule,
    MatCardModule,
    MatPaginatorModule,
    MatSortModule,
    MatProgressSpinnerModule,
    MatTableModule,
    MatTableResponsiveModule,
    MatFormFieldModule,
    MatToolbarModule,
    MatDialogModule,
    MatIconModule,
    MatButtonModule,
    MatInputModule,
    MatDatepickerModule,
    FormsModule,
    MatRadioModule,
    // MatNativeDateModule,
    MatMomentDateModule,
    ReactiveFormsModule,
    MatButtonToggleModule,
    MatSelectModule,
    HttpClientModule,
    DefaultRoutingModule,
    // StoreModule.forFeature(userFeatureKey, reducer),

  ],
  providers : [ HotelService, ValidateService, DatePipe]
})
export class DefaultModule { }
