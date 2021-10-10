import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThematiqueSpecComponent } from './thematique-spec.component';

describe('ThematiqueSpecComponent', () => {
  let component: ThematiqueSpecComponent;
  let fixture: ComponentFixture<ThematiqueSpecComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ThematiqueSpecComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ThematiqueSpecComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
