import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DisponibilityListComponent } from './disponibility-list.component';

describe('DisponibilityListComponent', () => {
  let component: DisponibilityListComponent;
  let fixture: ComponentFixture<DisponibilityListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DisponibilityListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DisponibilityListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
