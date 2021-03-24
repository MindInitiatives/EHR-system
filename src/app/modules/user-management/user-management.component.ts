import { Component, OnInit } from '@angular/core';

// import { Moment } from 'moment';
// import * as moment from 'moment';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HotelService } from 'src/app/services/hotel.service';


interface Room {
  name: string;
}


@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.css']
})
export class UserManagementComponent implements OnInit {
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  minDate: Date;
  maxDate: Date;

  form: FormGroup;

  rooms: Room[] = [
    {name: 'one Room'},
    {name:'two Room'},
    {name:'mini Flat'},
    {name:'Self'}
  ];
  formBuilder: any;
  
  constructor(private _snackBar: MatSnackBar, private hotelService: HotelService) { }

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
      purpose: new FormControl('', Validators.required),
      appointmentDate: new FormControl('', Validators.required)
    });
  }

  createAppointment() {
    console.log(this.form.value);
    // this.submitted = true;
    // if (this.dataForm.valid) {
      this.hotelService.addUser(this.form.value);
      this._snackBar.open('User Added Successfully' , 'dismiss', {
                    duration: 1000,
                    horizontalPosition: this.horizontalPosition,
                    verticalPosition: this.verticalPosition,
                  });
      // this.router.navigate(['/user-data']);
      console.log(this.form.value);
    }
    

  }

  // createAppointment() {
  //   console.log(this.form.value);
    // this.errorMsg ='';
    // this.successMsg = '';
    // this.dashboardService.createAppointment(
    //   this.form.value
    //   )
    //   .subscribe((res) => {
    //     this._snackBar.open('Appointment Booked Successfully' , 'dismiss', {
    //             duration: 1000,
    //             horizontalPosition: this.horizontalPosition,
    //             verticalPosition: this.verticalPosition,
    //           });
    //                   console.log(res);
    //                 },
    //                 (error: ErrorEvent) => {
    //                   this._snackBar.open(error.error.message, 'dismiss', {
    //                     duration: 1000,
    //                     horizontalPosition: this.horizontalPosition,
    //                     verticalPosition: this.verticalPosition,
    //                   });
    //                 });
    //                 this.form.reset;
  // }

// }
