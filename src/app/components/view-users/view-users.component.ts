import { DatePipe } from '@angular/common';
import { ChangeDetectorRef, Component, Inject, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MAT_DIALOG_DEFAULT_OPTIONS } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import * as moment from 'moment';
import { Moment } from 'moment';
import { Observable } from 'rxjs';
import { AppState } from 'src/app/app.state';
import { UserDetail } from 'src/app/models/user.model';
import { HotelService } from 'src/app/services/hotel.service';


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
  selector: 'app-view-users',
  templateUrl: './view-users.component.html',
  styleUrls: ['./view-users.component.css']
})
export class ViewUsersComponent implements OnInit {

  public loading = true;
  public errorMsg: string;
  public successMsg: String;
  public details: UserDetail[];
  public detail : UserDetail;

  listData : MatTableDataSource<any>;

  displayedColumns: string[] = ['id', 'name', 'address', 'date', 'status', 'email', 'phone', 'roomBooked', 'amountPaid', 'action'];
  
  resultsLength = 0;
  isLoadingResults = true;
  isRateLimitReached = false;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  searchDate = new FormControl(new Date());
  currentYear = new Date().getFullYear();
  serializedDate = new FormControl((new Date()).toISOString());
  minDate: Date;
  maxDate: Date;

  public users$: Observable<UserDetail>;

  constructor(public datepipe: DatePipe,
    public dialog: MatDialog,private router: Router,
    private _snackBar: MatSnackBar, 
    private hotelService: HotelService, 
    private store: Store<AppState>,
    private changeDetectorRefs: ChangeDetectorRef) { 

    this.store.select(hotelService.allUsers).subscribe(users => {

      
      if (users.length) {
      console.log('products', users[0]);
      this.users$ = users
      this.listData = new MatTableDataSource(users);
      this.listData.sort = this.sort;
      this.loading = false;
      }
      else {
        this.errorMsg = "No Data Available"
        // this.loading = false;
      }
    });

    console.log(this.users$);

    }

  ngOnInit(): void {
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

  viewdetail(data) {
    // this.hotelService.getDetail(data._id);
    console.log('view record ID>>>', data._id);
    this.router.navigate(['/user-details'], { queryParams: { id: data._id } });
  }

  editRecord(id) {
    console.log('Edit record ID>>>', id);
    this.router.navigate(['/edit-user'], { queryParams: { id: id } });
    // this.router.navigate(['/edit-user', id]);
}

openDialog(id: UserDetail): void {
      
  this.detail = id;
   console.log(id);

 const dialogRef = this.dialog.open(EditModalComponent, {
   width: '50%',
   autoFocus: true,
   data: {
     _id : this.detail._id,
     email : this.detail.email,
     firstname: this.detail.firstname,
     lastname: this.detail.lastname,
     address: this.detail.address,
     phone: this.detail.phone,
     roomBooked: this.detail.roomBooked,
     status: this.detail.status,
     date: this.detail.date
   }
 })
 // .afterClosed().subscribe(result => {
 //   this.refresh();
 // });

 dialogRef.disableClose = true;

}
// refresh() {
//   this.listData.data.push(new this.users$())
// }

}

interface Room {
  name: string;
}

interface Amount {
  price: number
}

interface Status {
  name: string;
  value: string;
}

@Component({
  selector: 'dialog-box',
  templateUrl: 'dialog-box.component.html',
  styleUrls: ['./view-users.component.css'],
    providers: [
      {provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: {hasBackdrop: false}}
    ]
  })
export class EditModalComponent implements OnInit, OnDestroy {

  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
      verticalPosition: MatSnackBarVerticalPosition = 'top';
      rooms: Room[] = [
        {name: 'one Room'},
        {name:'two Room'},
        {name:'mini Flat'},
        {name:'Self'}
      ];
      amounts: Amount[] = [
        {price: 2000},
        {price: 3000},
        {price: 4000},
        {price: 5000}
      ];
      
      userstatus: Status[] = [
        {name: 'Check In', value: 'Checked In'},
        {name: 'Check Out', value: 'Checked Out'},
        {name: 'Reserve', value: 'Reserved'}
      ]

      minDate: Date;
      maxDate: Date;
      public loading = true;
      public errorMsg: string;
      public successMsg: String;
    currentYear: number;

    private userSub;
    public userDetail;
    private userId: number;
    form: FormGroup;

  constructor(
        private hotelService : HotelService,
        private _snackBar: MatSnackBar,
        public dialogRef: MatDialogRef<EditModalComponent>,
        @Inject(MAT_DIALOG_DATA) public data: UserDetail,
        private router: Router, 
        // private activatedRoute: ActivatedRoute
        ) { }

  ngOnInit(): void {

    this.form = new FormGroup({
      firstname: new FormControl('', Validators.required),
      lastname: new FormControl('', Validators.required),
      address: new FormControl('', Validators.required),
      email: new FormControl('', [
        Validators.required,
        Validators.email,
      ]),
      phone: new FormControl('', Validators.required),
      roomBooked: new FormControl('', Validators.required),
      date:  new FormControl((new Date()).toISOString()),
      status: new FormControl('', Validators.required),
      amountPaid : new FormControl('', Validators.required)
    });

    // this.activatedRoute.queryParams.subscribe((params: Params) => {
      
      this.userId  = this.data._id;
      const detail = this.hotelService.getDetail(this.userId);
      this.userSub = detail.subscribe((res) => {
          if(res !== undefined) {
              this.userDetail = res;
              this.form.patchValue( {
                firstname: this.userDetail.firstname,
                lastname: this.userDetail.lastname,
                phone: this.userDetail.phone,
                roomBooked: this.userDetail.roomBooked,
                address: this.userDetail.address,
                date: this.userDetail.date,
                email: this.userDetail.email,
                status: this.userDetail.status,
                amountPaid : this.userDetail.amountPaid
              })
          } else {
              this.userDetail = {};
          }
      })
  // });
    this.minDate = new Date();
this.maxDate = new Date(this.currentYear + 1, 11, 31);
    

    
  }

ngOnDestroy() {
  this.userSub.unsubscribe()
}

myDateFilter = (m: Moment | null): boolean => {
const day = (m || moment()).day();
return day !== 0 && day !== 6;
}

onNoClick(): void {
  this.dialogRef.close();
}

onSubmitEditForm() {
    console.log(this.userDetail);
    console.log(this.form.value);
    // console.log(this.form.get('_id').value);
    if (this.form.valid) {
    this.hotelService.edit(this.userDetail._id, this.form.value);
    // this.router.navigate(['/view-user'], { queryParams: { id: data._id } });
    this.router.navigate(['/view-users']);
    }
    // this.listData.data.splice(0, 0);
  }
  

}