import { TestBed } from '@angular/core/testing';

import { ProgramInstDetailService } from './program-inst-detail.service';

describe('ProgramInstDetailService', () => {
  let service: ProgramInstDetailService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProgramInstDetailService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
