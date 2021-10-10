import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClasseParticipantListComponent } from './classe-participant-list.component';

describe('ParticipantListComponent', () => {
  let component: ClasseParticipantListComponent;
  let fixture: ComponentFixture<ClasseParticipantListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClasseParticipantListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClasseParticipantListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
