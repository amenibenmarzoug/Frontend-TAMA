import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MainComponent3 } from './main.component';

describe('MainComponent3', () => {
  let component: MainComponent3;
  let fixture: ComponentFixture<MainComponent3>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MainComponent3 ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MainComponent3);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
