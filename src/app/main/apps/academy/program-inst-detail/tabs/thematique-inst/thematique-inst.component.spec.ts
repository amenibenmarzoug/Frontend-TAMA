import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ThematiqueInstComponent } from './thematique-inst.component';

describe('ThematiqueInstComponent', () => {
  let component: ThematiqueInstComponent;
  let fixture: ComponentFixture<ThematiqueInstComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ThematiqueInstComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ThematiqueInstComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
