import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgramSpecFormComponent } from './program-spec-form.component';

describe('ProgramSpecFormComponent', () => {
  let component: ProgramSpecFormComponent;
  let fixture: ComponentFixture<ProgramSpecFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProgramSpecFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProgramSpecFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
