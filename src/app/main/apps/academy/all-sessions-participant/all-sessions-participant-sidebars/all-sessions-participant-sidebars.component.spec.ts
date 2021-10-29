import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllSessionsParticipantSidebarsComponent } from './all-sessions-participant-sidebars.component';

describe('AllSessionsParticipantSidebarsComponent', () => {
  let component: AllSessionsParticipantSidebarsComponent;
  let fixture: ComponentFixture<AllSessionsParticipantSidebarsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllSessionsParticipantSidebarsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AllSessionsParticipantSidebarsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
