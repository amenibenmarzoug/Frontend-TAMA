import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModuleClasseComponent } from './module-classe.component';

describe('ModuleClasseComponent', () => {
  let component: ModuleClasseComponent;
  let fixture: ComponentFixture<ModuleClasseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModuleClasseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModuleClasseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
