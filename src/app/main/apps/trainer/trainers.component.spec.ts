import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainersComponent } from './trainer.component';

describe('ParticipantsComponent', () => {
  let component: TrainersComponent;
  let fixture: ComponentFixture<TrainersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrainersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrainersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
