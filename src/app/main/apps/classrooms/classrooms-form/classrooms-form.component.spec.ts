import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClassroomsFormComponent } from './classrooms-form.component';

describe('ClassroomsFormComponent', () => {
  let component: ClassroomsFormComponent;
  let fixture: ComponentFixture<ClassroomsFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClassroomsFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClassroomsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
