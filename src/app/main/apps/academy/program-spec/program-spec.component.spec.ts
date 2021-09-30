import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgramSpecComponent } from './program-spec.component';

describe('ProgramSpecComponent', () => {
  let component: ProgramSpecComponent;
  let fixture: ComponentFixture<ProgramSpecComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProgramSpecComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProgramSpecComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
