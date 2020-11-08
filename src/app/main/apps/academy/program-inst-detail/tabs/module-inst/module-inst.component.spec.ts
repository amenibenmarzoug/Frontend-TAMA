import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModuleInstComponent } from './module-inst.component';

describe('ModuleInstComponent', () => {
  let component: ModuleInstComponent;
  let fixture: ComponentFixture<ModuleInstComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModuleInstComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModuleInstComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
