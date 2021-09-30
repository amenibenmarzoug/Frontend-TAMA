import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectedBarModuleSpecComponent } from './selected-bar-module-spec.component';

describe('SelectedBarModuleSpecComponent', () => {
  let component: SelectedBarModuleSpecComponent;
  let fixture: ComponentFixture<SelectedBarModuleSpecComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelectedBarModuleSpecComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectedBarModuleSpecComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
