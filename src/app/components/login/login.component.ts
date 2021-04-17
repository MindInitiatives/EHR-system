import { Component, OnInit } from '@angular/core';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  hide = true;
  // authService: any;
  // router: any;
  constructor(private _snackBar: MatSnackBar,
    // private authService: AuthService,
    private router: Router) { }
  

  // id : string
  username : string
  password : string

  ngOnInit(): void {
  }

  openSnackBar() {
    this._snackBar.open('Cannonball!!', 'End now', {
      duration: 1000,
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
    });
  }
  
  onLoginSubmit(){
    const user = {
      // id: this.id,
      username: this.username,
      password: this.password
    }

    console.log(user);

    this._snackBar.open('You are now Logged in', 'dismiss', {
            duration: 1000,
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,
          });
    this.router.navigate(['/register-user'])

  }

}
