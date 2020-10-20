import { TestBed } from '@angular/core/testing';

import { CursusTrainingService } from './cursus-training.service';

describe('CursusTrainingService', () => {
  let service: CursusTrainingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CursusTrainingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
