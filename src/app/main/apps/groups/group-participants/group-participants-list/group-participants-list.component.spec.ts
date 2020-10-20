import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupParticipantsListComponent } from './group-participants-list.component';

describe('TrainerListComponent', () => {
  let component: GroupParticipantsListComponent;
  let fixture: ComponentFixture<GroupParticipantsListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GroupParticipantsListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupParticipantsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
