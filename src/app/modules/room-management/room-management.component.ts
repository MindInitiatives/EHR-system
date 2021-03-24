import {Component, ViewChild, AfterViewInit, OnInit, Inject, Input} from '@angular/core';
import { FormControl, Validators, FormGroup, FormBuilder } from '@angular/forms';
import { MAT_DATE_FORMATS } from '@angular/material/core';
import { HotelService } from 'src/app/services/hotel.service';
import { mergeMap, tap, filter } from 'rxjs/operators'
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA, MAT_DIALOG_DEFAULT_OPTIONS} from '@angular/material/dialog';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { DatePipe } from '@angular/common';
// import { Moment } from 'moment';
// import * as moment from 'moment';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { MAT_MOMENT_DATE_FORMATS } from '@angular/material-moment-adapter';
import { UserDetail } from 'src/app/models/user.model';

export interface DialogData {
  id: string;
  firstname: string,
      lastname: string,
      address: string,
      organization: string,
      email: string,
      phone: string,
      roomBooked: string,
      appointmentDate: string
}

interface Room {
  name: string;
}

export const MY_FORMATS = {
  parse: {
    dateInput: 'LL',
  },
  display: {
    dateInput: 'DD/MM/YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
},
};

@Component({
  selector: 'app-room-management',
  templateUrl: './room-management.component.html',
  styleUrls: ['./room-management.component.css'],
  providers: [
    {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},
  ],
})
export class RoomManagementComponent implements OnInit {
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  
  public loading = true;
  public errorMsg: string;
  public successMsg: String;
  public details: UserDetail[];
  public detail : UserDetail;

  
  listData : MatTableDataSource<any>;

  displayedColumns: string[] = ['s/n', 'name', 'person to meet', 'state', 'city', 'address', 'date', 'purpose', 'organization', 'email', 'phone', 'action'];
  
  resultsLength = 0;
  isLoadingResults = true;
  isRateLimitReached = false;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  searchDate = new FormControl(new Date());
  currentYear = new Date().getFullYear();
  serializedDate = new FormControl((new Date()).toISOString());
  
  // id: string;

  constructor(
    public datepipe: DatePipe,
    private _snackBar: MatSnackBar,
    public dialog: MatDialog,
     private dashboardService: HotelService) { }

  ngOnInit(): void {
    this.getAppointmentList();
    const currentYear = new Date().getFullYear();
    // this.listData.filterPredicate = (detail, filter: string) => !filter || detail.appointmentDate.includes(filter);    
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.listData.filter = filterValue.trim().toLowerCase();

    if (this.listData.paginator) {
      this.listData.paginator.firstPage();
    }
  }
  addEvent(filterValue: string, event: MatDatepickerInputEvent<Date>) {
    // const filterValue = (event.target as HTMLInputElement).value;
    console.log(event.value);
    if(event.value!=undefined){
      filterValue =this.datepipe.transform(filterValue, 'dd/MM/yyyy');
    } 
    this.listData.filter = filterValue.trim();

    // if (this.listData.paginator) {
    //   this.listData.paginator.firstPage();
    // }
  }

  getAppointmentList() {
    // this.dashboardService.getGuestsAppointments()
    // .subscribe((appointments: Appointment[]) => {
    //   this.appointments = appointments;
    //   this.listData = new MatTableDataSource(appointments);
    //   this.listData.sort = this.sort;
    //   this.loading = false;
    // },
    // (error: ErrorEvent) => {
    //   this.errorMsg = error.error.message;
    //   this.loading = false;
    // });
    console.log("i")
  }


  cancelAppointment(id: string) {
    // this.dashboardService.cancelAppointment(id)
    // .pipe(
    //   mergeMap(() => this.dashboardService.getGuestsAppointments())
    //   )
    //   .subscribe((appointments : Appointment[]) => {
    //     this.appointments = appointments;
    //     this._snackBar.open('Successfully cancelled the appointment' , 'dismiss', {
    //       duration: 1000,
    //       horizontalPosition: this.horizontalPosition,
    //       verticalPosition: this.verticalPosition,
    //     });
    //             console.log(this.appointments);
    //           },
    //           (error: ErrorEvent) => {
    //             this._snackBar.open(error.error.message, 'dismiss', {
    //               duration: 1000,
    //               horizontalPosition: this.horizontalPosition,
    //               verticalPosition: this.verticalPosition,
    //             });
    //           });
    }

    // openDialog(id: UserDetail): void {
      
    //    this.detail = id;
    //     console.log(id);

    //   const dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
    //     width: '50%',
    //     autoFocus: true,
    //     data: {
    //       _id : this.detail._id,
    //       email : this.detail.email,
    //       firstname: this.detail.firstname,
    //       lastname: this.detail.lastname,
    //       address: this.detail.address,
    //       phone: this.detail.phone,
    //       roomBooked: this.detail.roomBooked,
    //       // appointmentDate: this.detail.appointmentDate
    //     }
    //   });

    //   dialogRef.disableClose = true;
  
    // }

}

// @Component({
//   selector: 'dialog-overview-example-dialog',
//   templateUrl: 'edit-detail-dialog.component.html',
//   styleUrls: ['./room-management.component.css'],
//   providers: [
//     {provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: {hasBackdrop: false}}
//   ]
// })
// export class DialogOverviewExampleDialog implements OnInit {
//   horizontalPosition: MatSnackBarHorizontalPosition = 'center';
//   verticalPosition: MatSnackBarVerticalPosition = 'top';
  
//   visitHost = new FormControl('', Validators.required);
//   hostSelectFormControl = new FormControl('', Validators.required);
//   rooms: Room[] = [
//     {name: 'one Room'},
//     {name:'two Room'},
//     {name:'mini Flat'},
//     {name:'Self'}
//   ];
  
//   form: FormGroup;
//   public loading = true;
//   public errorMsg: string;
//   public successMsg: String;
//   appointmentObj : any = this.data;
  
//   constructor(
//     private _snackBar: MatSnackBar,
//     public dialogRef: MatDialogRef<DialogOverviewExampleDialog>,
//     @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

//   ngOnInit(): void {
//     this.form = new FormGroup({
//       firstname: new FormControl('', Validators.required),
//       lastname: new FormControl('', Validators.required),
//       address: new FormControl('', Validators.required),
//       organization: new FormControl('', Validators.required),
//       email: new FormControl('', [
//         Validators.required,
//         Validators.email,
//       ]),
//       phone: new FormControl('', Validators.required),
//       roomBooked: new FormControl('', Validators.required),
//       appointmentDate: new FormControl('', Validators.required)
//     });
    
//     console.log(this.data, "here");
//     console.log(this.data.email, "here");
//     this.form.patchValue( {
//       firstname: this.data.firstname,
//       lastname: this.data.lastname,
//       organization: this.data.organization,
//       phone: this.data.phone,
//       roomBooked: this.data.roomBooked,
//       address: this.data.address,
//       appointmentDate: this.data.appointmentDate,
//       email: this.data.email,
//     })
    
    
    
//   }

//   onNoClick(): void {
//     this.dialogRef.close();
//   }
  

//   updateAppointment(id:UserDetail) {
//     console.log(this.form.value);
//   }

//   submit() {
//     if (this.form.valid) {
//       console.log(this.form.value);
//     }
//   }

// }
