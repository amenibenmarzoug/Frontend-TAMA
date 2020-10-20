import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AvailableTrainersListComponent } from './available-trainers-list.component';

describe('AvailableTrainersListComponent', () => {
  let component: AvailableTrainersListComponent;
  let fixture: ComponentFixture<AvailableTrainersListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AvailableTrainersListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AvailableTrainersListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
