import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyParticipantsComponent } from './my-participants.component';

describe('MyParticipantsComponent', () => {
  let component: MyParticipantsComponent;
  let fixture: ComponentFixture<MyParticipantsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyParticipantsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyParticipantsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
