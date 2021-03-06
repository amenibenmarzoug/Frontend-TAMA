import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MainSessionsComponent } from './main.component';

describe('MainComponent', () => {
  let component: MainSessionsComponent;
  let fixture: ComponentFixture<MainSessionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MainSessionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MainSessionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
