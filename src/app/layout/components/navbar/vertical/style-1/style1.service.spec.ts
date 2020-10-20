import { TestBed } from '@angular/core/testing';

import { Style1Service } from './style1.service';

describe('Style1Service', () => {
  let service: Style1Service;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Style1Service);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
