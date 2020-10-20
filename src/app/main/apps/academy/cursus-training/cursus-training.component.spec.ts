import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CursusTrainingComponent } from './cursus-training.component';

describe('CursusTrainingComponent', () => {
  let component: CursusTrainingComponent;
  let fixture: ComponentFixture<CursusTrainingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CursusTrainingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CursusTrainingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
