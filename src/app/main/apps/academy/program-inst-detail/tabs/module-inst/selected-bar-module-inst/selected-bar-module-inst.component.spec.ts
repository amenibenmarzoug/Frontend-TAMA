import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectedBarModuleInstComponent } from './selected-bar-module-inst.component';

describe('SelectedBarModuleInstComponent', () => {
  let component: SelectedBarModuleInstComponent;
  let fixture: ComponentFixture<SelectedBarModuleInstComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectedBarModuleInstComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectedBarModuleInstComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
