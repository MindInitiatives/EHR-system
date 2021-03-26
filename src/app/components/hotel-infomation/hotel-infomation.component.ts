import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { HotelService } from 'src/app/services/hotel.service';

@Component({
  selector: 'app-hotel-infomation',
  templateUrl: './hotel-infomation.component.html',
  styleUrls: ['./hotel-infomation.component.css']
})
export class HotelInfomationComponent implements OnInit {

  form: FormGroup;
  horizontalPosition: MatSnackBarHorizontalPosition;
  verticalPosition: MatSnackBarVerticalPosition;


dataimage:any;

@ViewChild('fileInput') fileInput: ElementRef;
// fileAttr = 'Choose File';



  constructor(private _snackBar: MatSnackBar, 
    private hotelService: HotelService,
    private router: Router) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      hotelName: new FormControl('', Validators.required),
      contactName: new FormControl('', Validators.required),
      hotelImage: new FormControl(null, Validators.required),
      address: new FormControl('', Validators.required),
      contactEmail: new FormControl('', [
        Validators.required,
        Validators.email,
      ]),
      contactPhone: new FormControl('', Validators.required)
    });

}
  uploadFileEvt(imgFile: any) {
    if (imgFile.target.files && imgFile.target.files[0]) {

      // HTML5 FileReader API
      let reader = new FileReader();
      if(imgFile.target.files[0].size > 1000000){
                  alert("File is too big!");
                  // this.value = "";
               }
               else {
      reader.onload = (e: any) => {
        let image = document.getElementById("p-pic") as HTMLImageElement;

        image.src = e.target.result;
        image.onload = rs => {
          let imgBase64Path = e.target.result;
          console.log(imgBase64Path);
          this.dataimage = imgBase64Path;
          console.log(btoa(imgBase64Path));
        };
      };
      reader.readAsDataURL(imgFile.target.files[0]);
      
    }
  }
  }

//   var decodedStringAtoB = atob(encodedStringAtoB);
// console.log(decodedStringAtoB);

  AddInfo() {
    console.log(this.form.value);
    // this.submitted = true;
    if (this.form.valid) {
      this.hotelService.add(this.form.value);
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
