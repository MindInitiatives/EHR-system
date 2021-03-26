import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition, MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { Router, ActivatedRoute, Params } from '@angular/router';
import * as moment from 'moment';
import { Moment } from 'moment';
import { UserDetail } from 'src/app/models/user.model';
import { HotelService } from 'src/app/services/hotel.service';


interface Room {
  name: string;
}

interface Amount {
  price: number
}

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit, OnDestroy {

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
        private router: Router, private activatedRoute: ActivatedRoute) { }

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
      // status: new FormControl(this.status),
      amountPaid : new FormControl('', Validators.required)
    });

    this.activatedRoute.queryParams.subscribe((params: Params) => {
      
      this.userId  = params.id;
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
                amountPaid : this.userDetail.amountPaid
              })
          } else {
              this.userDetail = {};
          }
      })
  });
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
