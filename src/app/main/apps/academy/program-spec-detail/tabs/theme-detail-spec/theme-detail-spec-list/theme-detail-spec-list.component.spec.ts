import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThemeDetailSpecListComponent } from './theme-detail-spec-list.component';

describe('ThemeDetailSpecListComponent', () => {
  let component: ThemeDetailSpecListComponent;
  let fixture: ComponentFixture<ThemeDetailSpecListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ThemeDetailSpecListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ThemeDetailSpecListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
