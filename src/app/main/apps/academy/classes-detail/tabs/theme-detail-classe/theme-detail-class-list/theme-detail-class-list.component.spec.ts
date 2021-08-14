import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ThemeDetailClassListComponent } from './theme-detail-class-list.component';

describe('ThemeDetailClassListComponent', () => {
  let component: ThemeDetailClassListComponent;
  let fixture: ComponentFixture<ThemeDetailClassListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ThemeDetailClassListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ThemeDetailClassListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
