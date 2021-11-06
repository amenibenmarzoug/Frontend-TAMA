import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllSessionsTrainerSidebarsComponent } from './all-sessions-trainer-sidebars.component';

describe('AllSessionsTrainerSidebarsComponent', () => {
  let component: AllSessionsTrainerSidebarsComponent;
  let fixture: ComponentFixture<AllSessionsTrainerSidebarsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllSessionsTrainerSidebarsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AllSessionsTrainerSidebarsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
