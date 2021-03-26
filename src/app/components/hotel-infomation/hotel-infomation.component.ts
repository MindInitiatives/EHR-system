import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { HotelDetail } from 'src/app/models/hotel.model';
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

  // public hotelSub: Observable<HotelDetail>;
  hotelSub : any= {}
dataimage:any;

@ViewChild('fileInput') fileInput: ElementRef;
  // hotelImage: any;
// fileAttr = 'Choose File';



  constructor(private _snackBar: MatSnackBar, 
    private hotelService: HotelService,
    private router: Router) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      hotelName: new FormControl({value:'', disabled:true}, Validators.required),
      contactName: new FormControl({value:'', disabled:true}, Validators.required),
      hotelImage: new FormControl('', Validators.required),
      address: new FormControl({value:'', disabled:true}, Validators.required),
      contactEmail: new FormControl({value:'', disabled:true}, [
        Validators.required,
        Validators.email,
      ]),
      contactPhone: new FormControl({value:'', disabled:true}, Validators.required)
    });

    this.getHotelInfo();

}

enableFields() {
  this.form.get('hotelName').enable();
  this.form.get('contactName').enable();
  this.form.get('address').enable();
  this.form.get('contactEmail').enable();
  this.form.get('contactPhone').enable();
}

  uploadFileEvt(imgFile: any) {
    if (imgFile.target.files && imgFile.target.files[0]) {

      // HTML5 FileReader API
      let reader = new FileReader();
      if(imgFile.target.files[0].size > 1000000){
                  this._snackBar.open("File is too big!" , 'dismiss', {
                    duration: 1000,
                    horizontalPosition: this.horizontalPosition,
                    verticalPosition: this.verticalPosition,
                  });
               }
               else {
      reader.onload = (e: any) => {
        let image = document.getElementById("p-pic") as HTMLImageElement;

        image.src = e.target.result;
        image.onload = rs => {
          let imgBase64Path = e.target.result;
          console.log(imgBase64Path);
          this.dataimage = btoa(imgBase64Path);
          console.log(btoa(imgBase64Path));
          this.form.patchValue( {
            hotelImage: this.dataimage
          })
        };
      };
      reader.readAsDataURL(imgFile.target.files[0]);
      
    }
  }
  }

  getHotelInfo() {

    this.hotelService.list().subscribe( (res) => {

      console.log(res);
      if(res != null) {
        this.hotelSub = res[0]

        console.log(this.hotelSub);

    this.form = new FormGroup({
      hotelName: new FormControl({value:this.hotelSub.hotelName, disabled:true}, Validators.required),
      contactName: new FormControl({value:this.hotelSub.contactName, disabled:true}, Validators.required),
      address: new FormControl({value:this.hotelSub.address, disabled:true}, null),
      contactEmail: new FormControl({value:this.hotelSub.contactEmail, disabled:true}, Validators.required),
      contactPhone: new FormControl({value:this.hotelSub.contactPhone, disabled:true}, Validators.required),
      hotelImage: new FormControl({value:this.hotelSub.hotelImage}, Validators.required)});
      

      this.dataimage = this.hotelSub.hotelImage;
      if(this.dataimage == null) {
        // this.learnerProfilePicture = "assets/img/gender-neutral-user.png"
      }
      else {

        let image = document.getElementById("p-pic") as HTMLImageElement;

        image.src = atob(this.dataimage);
    }
    }
    });

  }
//   var decodedStringAtoB = atob(encodedStringAtoB);
// console.log(decodedStringAtoB);

  AddInfo() {
    console.log(this.form.value);
    if (this.form.valid) {
      this.hotelService.addHotel(this.form.value);
      this._snackBar.open('User Added Successfully' , 'dismiss', {
                    duration: 1000,
                    horizontalPosition: this.horizontalPosition,
                    verticalPosition: this.verticalPosition,
                  });
      this.router.navigate(['/hotel-information']);
      this.form.disable();

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
