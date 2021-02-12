import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ThemeDetailClasseComponent } from './theme-detail-classe.component';

describe('ThemeDetailClasseComponent', () => {
  let component: ThemeDetailClasseComponent;
  let fixture: ComponentFixture<ThemeDetailClasseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ThemeDetailClasseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ThemeDetailClasseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
