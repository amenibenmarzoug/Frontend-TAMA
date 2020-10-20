import { TestBed } from '@angular/core/testing';

import { CoursetrainerService } from './coursetrainer.service';

describe('CoursetrainerService', () => {
  let service: CoursetrainerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CoursetrainerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
