import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThemeDetailClasseFormComponent } from './theme-detail-classe-form.component';

describe('ThemeDetailClasseFormComponent', () => {
  let component: ThemeDetailClasseFormComponent;
  let fixture: ComponentFixture<ThemeDetailClasseFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ThemeDetailClasseFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ThemeDetailClasseFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
