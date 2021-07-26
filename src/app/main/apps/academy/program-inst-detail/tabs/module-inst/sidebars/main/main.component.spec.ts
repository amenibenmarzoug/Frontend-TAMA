import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MainComponent2 } from './main.component';

describe('MainComponent', () => {
  let component: MainComponent2;
  let fixture: ComponentFixture<MainComponent2>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MainComponent2 ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MainComponent2);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
