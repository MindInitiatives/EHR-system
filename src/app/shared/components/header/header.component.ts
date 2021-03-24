import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition, MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { HotelService } from 'src/app/services/hotel.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  @Output() toggleSideBarForMe: EventEmitter<any> = new EventEmitter();
  username: any;

  constructor(private _snackBar: MatSnackBar,
    private hotelService: HotelService,
    private router: Router) { }

  ngOnInit(): void {
  }
  


  toggleSideBar() {
    this.toggleSideBarForMe.emit();
    setTimeout(()=> {
      window.dispatchEvent(
        new Event('resize')
      );
    }, 300);
  }

}
