import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MainModuleInstComponent } from './mainModule.component';

describe('MainModuleInstComponent', () => {
  let component: MainModuleInstComponent;
  let fixture: ComponentFixture<MainModuleInstComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MainModuleInstComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MainModuleInstComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
