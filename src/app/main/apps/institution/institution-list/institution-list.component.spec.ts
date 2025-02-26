import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InstitutionListComponent } from './institution-list.component';

describe('TrainerListComponent', () => {
  let component: InstitutionListComponent;
  let fixture: ComponentFixture<InstitutionListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InstitutionListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InstitutionListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
