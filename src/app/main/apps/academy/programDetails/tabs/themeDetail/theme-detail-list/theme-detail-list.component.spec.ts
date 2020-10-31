import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ThemeDetailsListComponent } from './theme-detail-list.component';

describe('ThemeDetailsListComponent', () => {
  let component: ThemeDetailsListComponent;
  let fixture: ComponentFixture<ThemeDetailsListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ThemeDetailsListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ThemeDetailsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
