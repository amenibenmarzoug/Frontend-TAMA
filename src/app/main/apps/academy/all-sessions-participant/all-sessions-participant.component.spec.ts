import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllSessionsParticipantComponent } from './all-sessions-participant.component';

describe('AllSessionsParticipantComponent', () => {
  let component: AllSessionsParticipantComponent;
  let fixture: ComponentFixture<AllSessionsParticipantComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllSessionsParticipantComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AllSessionsParticipantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
