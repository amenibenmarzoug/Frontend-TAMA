import { TestBed } from '@angular/core/testing';

import { ProgramSpecService } from './program-spec.service';

describe('ProgramSpecService', () => {
  let service: ProgramSpecService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProgramSpecService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
