import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyParticipantFormComponent } from './my-participant-form.component';

describe('MyParticipantFormComponent', () => {
  let component: MyParticipantFormComponent;
  let fixture: ComponentFixture<MyParticipantFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyParticipantFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyParticipantFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
