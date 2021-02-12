import { TestBed } from '@angular/core/testing';

import { ProgramsInstService } from './programs-inst.service';

describe('ProgramsInstService', () => {
  let service: ProgramsInstService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProgramsInstService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
