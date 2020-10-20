import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DisponibilityTrainerComponent } from './disponibility-trainer.component';

describe('DisponibilityTrainerComponent', () => {
  let component: DisponibilityTrainerComponent;
  let fixture: ComponentFixture<DisponibilityTrainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DisponibilityTrainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DisponibilityTrainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
