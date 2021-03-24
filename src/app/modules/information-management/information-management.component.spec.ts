import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InformationManagementComponent } from './information-management.component';

describe('InformationManagementComponent', () => {
  let component: InformationManagementComponent;
  let fixture: ComponentFixture<InformationManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InformationManagementComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InformationManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
