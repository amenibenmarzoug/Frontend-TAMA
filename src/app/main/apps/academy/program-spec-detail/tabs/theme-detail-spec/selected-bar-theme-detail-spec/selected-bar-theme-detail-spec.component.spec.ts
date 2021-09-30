import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectedBarThemeDetailSpecComponent } from './selected-bar-theme-detail-spec.component';

describe('SelectedBarThemeDetailSpecComponent', () => {
  let component: SelectedBarThemeDetailSpecComponent;
  let fixture: ComponentFixture<SelectedBarThemeDetailSpecComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelectedBarThemeDetailSpecComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectedBarThemeDetailSpecComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
