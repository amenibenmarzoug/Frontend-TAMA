import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgramInstDetailComponent } from './program-inst-detail.component';

describe('ProgramInstDetailComponent', () => {
  let component: ProgramInstDetailComponent;
  let fixture: ComponentFixture<ProgramInstDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProgramInstDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProgramInstDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
