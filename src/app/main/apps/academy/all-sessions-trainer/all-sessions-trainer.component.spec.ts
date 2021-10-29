import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllSessionsTrainerComponent } from './all-sessions-trainer.component';

describe('AllSessionsTrainerComponent', () => {
  let component: AllSessionsTrainerComponent;
  let fixture: ComponentFixture<AllSessionsTrainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllSessionsTrainerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AllSessionsTrainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
