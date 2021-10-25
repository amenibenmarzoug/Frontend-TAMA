import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AttendanceCompanySidebarsComponent } from './attendance-company-sidebars.component';

describe('AttendanceCompanySidebarsComponent', () => {
  let component: AttendanceCompanySidebarsComponent;
  let fixture: ComponentFixture<AttendanceCompanySidebarsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AttendanceCompanySidebarsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AttendanceCompanySidebarsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
