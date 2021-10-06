import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThemeDetailSpecFormComponent } from './theme-detail-spec-form.component';

describe('ThemeDetailSpecFormComponent', () => {
  let component: ThemeDetailSpecFormComponent;
  let fixture: ComponentFixture<ThemeDetailSpecFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ThemeDetailSpecFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ThemeDetailSpecFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
