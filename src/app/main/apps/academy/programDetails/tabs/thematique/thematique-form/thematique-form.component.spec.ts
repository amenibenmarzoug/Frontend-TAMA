import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ThematiqueFormComponent } from './thematique-form.component';

describe('ThematiqueFormComponent', () => {
  let component: ThematiqueFormComponent;
  let fixture: ComponentFixture<ThematiqueFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ThematiqueFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ThematiqueFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
