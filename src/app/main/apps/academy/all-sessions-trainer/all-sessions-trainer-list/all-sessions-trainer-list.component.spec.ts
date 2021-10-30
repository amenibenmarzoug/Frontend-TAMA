import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllSessionsTrainerListComponent } from './all-sessions-trainer-list.component';

describe('AllSessionsTrainerListComponent', () => {
  let component: AllSessionsTrainerListComponent;
  let fixture: ComponentFixture<AllSessionsTrainerListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllSessionsTrainerListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AllSessionsTrainerListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
