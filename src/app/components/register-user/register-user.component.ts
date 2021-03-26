import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

interface Room {
  name: string;
}

interface Amount {
  price: number
}

@Component({
  selector: 'app-register-user',
  templateUrl: './register-user.component.html',
  styleUrls: ['./register-user.component.css']
})

export class RegisterUserComponent implements OnInit {
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  form: FormGroup;

  userstatus: string[] = ['Check In', 'Check Out', 'Reserve'];

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
  formBuilder: any;
  status : string;
  constructor(public datepipe: DatePipe,
    private _snackBar: MatSnackBar, 
    private userService: UserService,
    private router: Router) { }

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
      // status: new FormControl('', Validators.required),
      amountPaid : new FormControl('', Validators.required)
    });
  }

  createAppointment() {
    console.log(this.form.value);
    // this.submitted = true;
    if (this.form.valid) {
      this.userService.addUser(this.form.value);
      this._snackBar.open('User Added Successfully' , 'dismiss', {
                    duration: 1000,
                    horizontalPosition: this.horizontalPosition,
                    verticalPosition: this.verticalPosition,
                  });
      // this.hotelService.storeCurrentData(this.form.value);
      // this.status = "Checked In"
      // this.form.patchValue( {
      //   status: "Checked In"
      // });
      this.router.navigate(['/view-users']);

                }
                else {
                  this._snackBar.open('Please Fill in Required Details' , 'dismiss', {
                    duration: 1000,
                    horizontalPosition: this.horizontalPosition,
                    verticalPosition: this.verticalPosition,
                  });
                }
    }

}
