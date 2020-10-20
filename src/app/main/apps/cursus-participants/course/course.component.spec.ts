import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CursusCoursePartComponent } from './course.component';

describe('CourseComponent', () => {
  let component: CursusCoursePartComponent;
  let fixture: ComponentFixture<CursusCoursePartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CursusCoursePartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CursusCoursePartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
