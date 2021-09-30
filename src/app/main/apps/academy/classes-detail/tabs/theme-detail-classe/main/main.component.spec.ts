import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MainComponent4 } from './main.component';

describe('MainComponent4', () => {
  let component: MainComponent4;
  let fixture: ComponentFixture<MainComponent4>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MainComponent4 ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MainComponent4);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
