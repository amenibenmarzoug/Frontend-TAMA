import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModulesInstListComponent } from './modules-inst-list.component';

describe('ModulesInstListComponent', () => {
  let component: ModulesInstListComponent;
  let fixture: ComponentFixture<ModulesInstListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModulesInstListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModulesInstListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
