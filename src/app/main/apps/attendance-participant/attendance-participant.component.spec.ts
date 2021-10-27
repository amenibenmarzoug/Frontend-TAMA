import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AttendanceParticipantComponent } from './attendance-participant.component';

describe('AttendanceParticipantComponent', () => {
  let component: AttendanceParticipantComponent;
  let fixture: ComponentFixture<AttendanceParticipantComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AttendanceParticipantComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AttendanceParticipantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
