import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectedBarModuleComponent } from './selected-bar-module.component';

describe('SelectedBarModuleComponent', () => {
  let component: SelectedBarModuleComponent;
  let fixture: ComponentFixture<SelectedBarModuleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectedBarModuleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectedBarModuleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
