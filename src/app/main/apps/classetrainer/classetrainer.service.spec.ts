import { TestBed } from '@angular/core/testing';

import { ClassetrainerService } from './classetrainer.service';

describe('ClassetrainerService', () => {
  let service: ClassetrainerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ClassetrainerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
