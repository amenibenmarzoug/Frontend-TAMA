import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThematiqueSpecFormComponent } from './thematique-spec-form.component';

describe('ThematiqueSpecFormComponent', () => {
  let component: ThematiqueSpecFormComponent;
  let fixture: ComponentFixture<ThematiqueSpecFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ThematiqueSpecFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ThematiqueSpecFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
