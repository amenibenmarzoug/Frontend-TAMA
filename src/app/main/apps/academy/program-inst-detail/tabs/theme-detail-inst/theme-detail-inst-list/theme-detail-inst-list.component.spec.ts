import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ThemeDetailInstListComponent } from './theme-detail-inst-list.component';

describe('ThemeDetailInstListComponent', () => {
  let component: ThemeDetailInstListComponent;
  let fixture: ComponentFixture<ThemeDetailInstListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ThemeDetailInstListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ThemeDetailInstListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
