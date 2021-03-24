import { Component, OnDestroy, OnInit } from '@angular/core';
import { MediaObserver, MediaChange } from '@angular/flex-layout';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-default',
  templateUrl: './default.component.html',
  styleUrls: ['./default.component.css']
})
export class DefaultComponent implements OnInit, OnDestroy {

  mediaSub:Subscription;
  deviceXs:boolean;
  sideBarOpen = true;

  constructor(public mediaObserver:MediaObserver) { }

  ngOnInit(): void {

    
    
    this.mediaSub = this.mediaObserver.media$.subscribe(
      (result:MediaChange)=> {
        if(result.mqAlias === 'xs'){
          this.sideBarOpen = false;
        }else {
          this.sideBarOpen = true;
        }
    });
  }

  ngOnDestroy(): void {
    this.mediaSub.unsubscribe();
  }

  sideBarToggler() {
    this.sideBarOpen = !this.sideBarOpen;
  }


}
