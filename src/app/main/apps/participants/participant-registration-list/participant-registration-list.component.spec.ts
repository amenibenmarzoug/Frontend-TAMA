import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParticipantRegistrationListComponent } from './participant-registration-list.component';

describe('ParticipantRegistrationListComponent', () => {
  let component: ParticipantRegistrationListComponent;
  let fixture: ComponentFixture<ParticipantRegistrationListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ParticipantRegistrationListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ParticipantRegistrationListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
