import { TestBed } from '@angular/core/testing';

import { ProgramSpecDetailService } from './program-spec-detail.service';

describe('ProgramSpecDetailService', () => {
  let service: ProgramSpecDetailService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProgramSpecDetailService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
