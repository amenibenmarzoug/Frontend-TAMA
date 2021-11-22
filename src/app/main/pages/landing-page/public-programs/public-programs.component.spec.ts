import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicProgramsComponent } from './public-programs.component';

describe('PublicProgramsComponent', () => {
  let component: PublicProgramsComponent;
  let fixture: ComponentFixture<PublicProgramsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PublicProgramsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PublicProgramsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
