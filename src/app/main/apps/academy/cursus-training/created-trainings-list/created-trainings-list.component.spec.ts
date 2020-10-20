import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatedTrainingsListComponent } from './created-trainings-list.component';

describe('CreatedTrainingsListComponent', () => {
  let component: CreatedTrainingsListComponent;
  let fixture: ComponentFixture<CreatedTrainingsListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreatedTrainingsListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreatedTrainingsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
