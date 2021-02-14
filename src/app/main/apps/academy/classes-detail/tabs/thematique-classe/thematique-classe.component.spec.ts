import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ThematiqueClasseComponent } from './thematique-classe.component';

describe('ThematiqueClasseComponent', () => {
  let component: ThematiqueClasseComponent;
  let fixture: ComponentFixture<ThematiqueClasseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ThematiqueClasseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ThematiqueClasseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});


