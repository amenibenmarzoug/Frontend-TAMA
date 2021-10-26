import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClassetrainerComponent } from './classetrainer.component';

describe('ClassetrainerComponent', () => {
  let component: ClassetrainerComponent;
  let fixture: ComponentFixture<ClassetrainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClassetrainerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClassetrainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
