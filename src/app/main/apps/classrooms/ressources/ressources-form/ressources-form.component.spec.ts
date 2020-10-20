import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RessourcesFormComponent } from './ressources-form.component';

describe('RessourcesFormComponent', () => {
  let component: RessourcesFormComponent;
  let fixture: ComponentFixture<RessourcesFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RessourcesFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RessourcesFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
