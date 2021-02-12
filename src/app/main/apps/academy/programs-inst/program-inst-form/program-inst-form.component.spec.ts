import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgramInstFormComponent } from './program-inst-form.component';

describe('ProgramInstFormComponent', () => {
  let component: ProgramInstFormComponent;
  let fixture: ComponentFixture<ProgramInstFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProgramInstFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProgramInstFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
