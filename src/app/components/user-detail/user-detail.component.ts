import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { HotelService } from 'src/app/services/hotel.service';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnInit {

    private userSub;
    public userDetail;
    private userId: number;

  constructor(private hotelService : HotelService,
    private _snackBar: MatSnackBar,
    private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe((params: Params) => {
      
      this.userId  = params.id;
      const detail = this.hotelService.getDetail(this.userId);
      this.userSub = detail.subscribe((res) => {
          if(res !== undefined) {
              this.userDetail = res;
          } else {
              this.userDetail = {};
          }
      })
  });
  }

  ngOnDestroy() {
    this.userSub.unsubscribe()
  }

}
