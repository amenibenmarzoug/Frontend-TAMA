import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModuleSpecFormComponent } from './module-spec-form.component';

describe('ModuleSpecFormComponent', () => {
  let component: ModuleSpecFormComponent;
  let fixture: ComponentFixture<ModuleSpecFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModuleSpecFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModuleSpecFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
