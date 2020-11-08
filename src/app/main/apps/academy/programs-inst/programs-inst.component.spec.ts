import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgramsInstComponent } from './programs-inst.component';

describe('ProgramsInstComponent', () => {
  let component: ProgramsInstComponent;
  let fixture: ComponentFixture<ProgramsInstComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProgramsInstComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProgramsInstComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
