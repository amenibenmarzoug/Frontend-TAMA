import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditTrainersListComponent } from './edit-trainers-list.component';

describe('EditTrainersListComponent', () => {
  let component: EditTrainersListComponent;
  let fixture: ComponentFixture<EditTrainersListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditTrainersListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditTrainersListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
