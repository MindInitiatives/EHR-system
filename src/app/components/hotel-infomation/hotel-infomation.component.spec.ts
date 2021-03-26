import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HotelInfomationComponent } from './hotel-infomation.component';

describe('HotelInfomationComponent', () => {
  let component: HotelInfomationComponent;
  let fixture: ComponentFixture<HotelInfomationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HotelInfomationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HotelInfomationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
