import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModuleSpecListComponent } from './module-spec-list.component';

describe('ModuleSpecListComponent', () => {
  let component: ModuleSpecListComponent;
  let fixture: ComponentFixture<ModuleSpecListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModuleSpecListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModuleSpecListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
