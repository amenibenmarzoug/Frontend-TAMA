import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicProgramsDetailsComponent } from './public-programs-details.component';

describe('PublicProgramsDetailsComponent', () => {
  let component: PublicProgramsDetailsComponent;
  let fixture: ComponentFixture<PublicProgramsDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PublicProgramsDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PublicProgramsDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
