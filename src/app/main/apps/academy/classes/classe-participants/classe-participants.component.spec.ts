import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClasseParticipantsComponent } from './classe-participants.component';

describe('ParticipantsComponent', () => {
  let component: ClasseParticipantsComponent;
  let fixture: ComponentFixture<ClasseParticipantsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClasseParticipantsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClasseParticipantsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
