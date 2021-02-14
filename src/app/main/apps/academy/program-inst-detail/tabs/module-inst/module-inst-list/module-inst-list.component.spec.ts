import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModuleInstListComponent } from './module-inst-list.component';

describe('ModuleInstListComponent', () => {
  let component: ModuleInstListComponent;
  let fixture: ComponentFixture<ModuleInstListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModuleInstListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModuleInstListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
