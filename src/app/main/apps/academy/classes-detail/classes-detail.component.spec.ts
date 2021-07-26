import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClassesDetailComponent } from './classes-detail.component';

describe('ClassesDetailComponent', () => {
  let component: ClassesDetailComponent;
  let fixture: ComponentFixture<ClassesDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClassesDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClassesDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
