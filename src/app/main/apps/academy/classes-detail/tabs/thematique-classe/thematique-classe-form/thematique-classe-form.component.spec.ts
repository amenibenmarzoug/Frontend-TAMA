import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThematiqueClasseFormComponent } from './thematique-classe-form.component';

describe('ThematiqueClasseFormComponent', () => {
  let component: ThematiqueClasseFormComponent;
  let fixture: ComponentFixture<ThematiqueClasseFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ThematiqueClasseFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ThematiqueClasseFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
