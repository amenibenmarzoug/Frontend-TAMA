import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RessourcesListComponent } from './ressources-list.component';

describe('ClassroomsListComponent', () => {
  let component: RessourcesListComponent;
  let fixture: ComponentFixture<RessourcesListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RessourcesListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RessourcesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
