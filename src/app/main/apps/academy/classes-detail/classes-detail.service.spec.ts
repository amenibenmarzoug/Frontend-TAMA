import { TestBed } from '@angular/core/testing';

import { ClassesDetailService } from './classes-detail.service';

describe('ClassesDetailService', () => {
  let service: ClassesDetailService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ClassesDetailService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
