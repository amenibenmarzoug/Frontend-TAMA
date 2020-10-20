import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EntrepriseFormComponent } from './entreprise-form.component';

describe('EntrepriseFormComponent', () => {
  let component: EntrepriseFormComponent;
  let fixture: ComponentFixture<EntrepriseFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EntrepriseFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EntrepriseFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
