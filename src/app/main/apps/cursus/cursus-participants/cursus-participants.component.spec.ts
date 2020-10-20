import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CursusParticipantsComponent } from './cursus-participants.component';

describe('CursusParticipantsComponent', () => {
  let component: CursusParticipantsComponent;
  let fixture: ComponentFixture<CursusParticipantsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CursusParticipantsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CursusParticipantsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
