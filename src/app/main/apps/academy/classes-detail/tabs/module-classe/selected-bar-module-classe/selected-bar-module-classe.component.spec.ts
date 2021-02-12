import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectedBarModuleClasseComponent } from './selected-bar-module-classe.component';

describe('SelectedBarModuleClasseComponent', () => {
  let component: SelectedBarModuleClasseComponent;
  let fixture: ComponentFixture<SelectedBarModuleClasseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectedBarModuleClasseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectedBarModuleClasseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
