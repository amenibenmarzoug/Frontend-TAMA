import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyDisponibilityComponent } from './my-disponibility.component';

describe('MyDisponibilityComponent', () => {
  let component: MyDisponibilityComponent;
  let fixture: ComponentFixture<MyDisponibilityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyDisponibilityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyDisponibilityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
