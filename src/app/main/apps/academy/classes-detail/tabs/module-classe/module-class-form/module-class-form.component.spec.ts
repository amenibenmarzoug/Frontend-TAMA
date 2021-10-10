import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModuleClassFormComponent } from './module-class-form.component';

describe('ModuleClassFormComponent', () => {
  let component: ModuleClassFormComponent;
  let fixture: ComponentFixture<ModuleClassFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModuleClassFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModuleClassFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
