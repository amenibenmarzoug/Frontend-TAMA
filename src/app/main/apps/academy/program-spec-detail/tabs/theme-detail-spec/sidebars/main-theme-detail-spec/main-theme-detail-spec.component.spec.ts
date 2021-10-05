import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainThemeDetailSpecComponent } from './main-theme-detail-spec.component';

describe('MainThemeDetailSpecComponent', () => {
  let component: MainThemeDetailSpecComponent;
  let fixture: ComponentFixture<MainThemeDetailSpecComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MainThemeDetailSpecComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MainThemeDetailSpecComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
