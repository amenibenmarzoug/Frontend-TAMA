import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupParticipantsComponent } from './group-participants.component';

describe('ParticipantsComponent', () => {
  let component: GroupParticipantsComponent;
  let fixture: ComponentFixture<GroupParticipantsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GroupParticipantsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupParticipantsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
