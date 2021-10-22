import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyRegistrationListComponent } from './company-registration-list.component';

describe('CompanyRegistrationListComponent', () => {
  let component: CompanyRegistrationListComponent;
  let fixture: ComponentFixture<CompanyRegistrationListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompanyRegistrationListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CompanyRegistrationListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
