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
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatInputModule } from '@angular/material/input'
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner'
import { HotelService } from '../../services/hotel.service'
import { ValidateService } from '../../services/validate.service'
import {MatDatepickerModule} from '@angular/material/datepicker';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import {HttpClientModule} from '@angular/common/http';
import { UserManagementComponent } from 'src/app/modules/user-management/user-management.component';
import { RoomManagementComponent } from 'src/app/modules/room-management/room-management.component';
import { InformationManagementComponent } from 'src/app/modules/information-management/information-management.component';
import { DefaultComponent } from './default.component';
import { StoreModule } from '@ngrx/store';
import { userFeatureKey, reducer } from 'src/app/user/store/reducer/reducer.reducer';



@NgModule({
  declarations: [
    DefaultComponent,
    UserManagementComponent,
    RoomManagementComponent,
    InformationManagementComponent,
    // DialogOverviewExampleDialog
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
    MatFormFieldModule,
    MatToolbarModule,
    MatDialogModule,
    MatIconModule,
    MatButtonModule,
    MatInputModule,
    MatDatepickerModule,
    FormsModule,
    // MatNativeDateModule,
    MatMomentDateModule,
    ReactiveFormsModule,
    MatButtonToggleModule,
    MatSelectModule,
    HttpClientModule,
    StoreModule.forFeature(userFeatureKey, reducer),

  ],
  providers : [ HotelService, ValidateService, DatePipe]
})
export class DefaultModule { }
