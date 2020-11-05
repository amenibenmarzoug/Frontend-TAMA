import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MainThemeDetailComponent } from './main-theme-detail.component';

describe('MainThemeDetailComponent', () => {
  let component: MainThemeDetailComponent;
  let fixture: ComponentFixture<MainThemeDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MainThemeDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MainThemeDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
