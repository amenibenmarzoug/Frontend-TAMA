import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ThematiqueInstFormComponent } from './thematique-inst-form.component';

describe('ThematiqueFormComponent', () => {
  let component: ThematiqueInstFormComponent;
  let fixture: ComponentFixture<ThematiqueInstFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ThematiqueInstFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ThematiqueInstFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
