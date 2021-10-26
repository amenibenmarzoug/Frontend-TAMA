import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AttendanceCompanyListComponent } from './attendance-company-list.component';

describe('AttendanceCompanyListComponent', () => {
  let component: AttendanceCompanyListComponent;
  let fixture: ComponentFixture<AttendanceCompanyListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AttendanceCompanyListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AttendanceCompanyListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
