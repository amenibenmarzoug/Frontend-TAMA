import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseTrainerComponent } from './course-trainer.component';

describe('CourseTrainerComponent', () => {
  let component: CourseTrainerComponent;
  let fixture: ComponentFixture<CourseTrainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CourseTrainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CourseTrainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
