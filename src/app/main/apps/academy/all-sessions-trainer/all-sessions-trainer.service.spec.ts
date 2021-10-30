import { TestBed } from '@angular/core/testing';

import { AllSessionsTrainerService } from './all-sessions-trainer.service';

describe('AllSessionsTrainerService', () => {
  let service: AllSessionsTrainerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AllSessionsTrainerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
