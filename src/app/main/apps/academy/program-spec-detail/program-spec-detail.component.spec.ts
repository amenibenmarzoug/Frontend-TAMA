import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgramSpecDetailComponent } from './program-spec-detail.component';

describe('ProgramSpecDetailComponent', () => {
  let component: ProgramSpecDetailComponent;
  let fixture: ComponentFixture<ProgramSpecDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProgramSpecDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProgramSpecDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
