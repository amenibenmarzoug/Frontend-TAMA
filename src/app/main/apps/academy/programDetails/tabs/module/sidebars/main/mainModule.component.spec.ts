import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MainModuleComponent } from './mainModule.component';

describe('MainModuleComponent', () => {
  let component: MainModuleComponent;
  let fixture: ComponentFixture<MainModuleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MainModuleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MainModuleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
