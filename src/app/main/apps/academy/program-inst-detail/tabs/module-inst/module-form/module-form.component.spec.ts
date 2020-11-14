import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModuleInstFormComponent } from './module-form.component';

describe('ModuleInstFormComponent', () => {
  let component: ModuleInstFormComponent;
  let fixture: ComponentFixture<ModuleInstFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModuleInstFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModuleInstFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
