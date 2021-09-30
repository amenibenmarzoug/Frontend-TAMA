import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThemeDetailSpecComponent } from './theme-detail-spec.component';

describe('ThemeDetailSpecComponent', () => {
  let component: ThemeDetailSpecComponent;
  let fixture: ComponentFixture<ThemeDetailSpecComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ThemeDetailSpecComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ThemeDetailSpecComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
