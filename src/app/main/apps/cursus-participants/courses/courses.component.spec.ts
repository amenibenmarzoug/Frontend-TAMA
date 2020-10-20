import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CursusCoursesPartComponent } from './courses.component';

describe('CoursesComponent', () => {
  let component: CursusCoursesPartComponent;
  let fixture: ComponentFixture<CursusCoursesPartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CursusCoursesPartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CursusCoursesPartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
