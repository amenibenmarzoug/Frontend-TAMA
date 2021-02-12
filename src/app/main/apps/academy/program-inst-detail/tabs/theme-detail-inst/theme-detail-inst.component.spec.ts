import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ThemeDetailInstComponent } from './theme-detail-inst.component';

describe('ThemeDetailInstComponent', () => {
  let component: ThemeDetailInstComponent;
  let fixture: ComponentFixture<ThemeDetailInstComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ThemeDetailInstComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ThemeDetailInstComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
