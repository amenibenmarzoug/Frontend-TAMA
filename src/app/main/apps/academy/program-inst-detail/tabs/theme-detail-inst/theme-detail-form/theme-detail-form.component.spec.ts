import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ThemeDetailFormComponent } from './theme-detail-form.component';

describe('ThemeDetailFormComponent', () => {
  let component: ThemeDetailFormComponent;
  let fixture: ComponentFixture<ThemeDetailFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ThemeDetailFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ThemeDetailFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
