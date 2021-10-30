import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllSessionsParticipantListComponent } from './all-sessions-participant-list.component';

describe('AllSessionsParticipantListComponent', () => {
  let component: AllSessionsParticipantListComponent;
  let fixture: ComponentFixture<AllSessionsParticipantListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllSessionsParticipantListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AllSessionsParticipantListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
