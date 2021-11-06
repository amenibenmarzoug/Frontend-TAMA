import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AttendanceParticipantListComponent } from './attendance-participant-list.component';

describe('AttendanceParticipantListComponent', () => {
  let component: AttendanceParticipantListComponent;
  let fixture: ComponentFixture<AttendanceParticipantListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AttendanceParticipantListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AttendanceParticipantListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
