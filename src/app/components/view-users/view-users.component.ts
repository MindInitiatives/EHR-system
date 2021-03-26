import { DatePipe } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
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
    this.hotelService.getDetail(data._id);
  }

  editRecord(id) {
    console.log('Edit record ID>>>', id);
    this.router.navigate(['/edit-user'], { queryParams: { id: id } });
    // this.router.navigate(['/edit-user', id]);
}

}
