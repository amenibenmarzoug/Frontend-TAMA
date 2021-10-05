import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainModuleSpecComponent } from './main-module-spec.component';

describe('MainModuleSpecComponent', () => {
  let component: MainModuleSpecComponent;
  let fixture: ComponentFixture<MainModuleSpecComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MainModuleSpecComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MainModuleSpecComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
