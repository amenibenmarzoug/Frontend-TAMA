import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyParticipantListComponent } from './my-participant-list.component';

describe('MyParticipantListComponent', () => {
  let component: MyParticipantListComponent;
  let fixture: ComponentFixture<MyParticipantListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyParticipantListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyParticipantListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
