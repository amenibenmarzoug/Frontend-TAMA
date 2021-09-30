import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModuleSpecComponent } from './module-spec.component';

describe('ModuleSpecComponent', () => {
  let component: ModuleSpecComponent;
  let fixture: ComponentFixture<ModuleSpecComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModuleSpecComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModuleSpecComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
