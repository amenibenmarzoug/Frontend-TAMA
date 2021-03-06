import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectedBarThemeDetailComponent } from './selected-bar-theme-detail.component';

describe('SelectedBarThemeDetailComponent', () => {
  let component: SelectedBarThemeDetailComponent;
  let fixture: ComponentFixture<SelectedBarThemeDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectedBarThemeDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectedBarThemeDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
