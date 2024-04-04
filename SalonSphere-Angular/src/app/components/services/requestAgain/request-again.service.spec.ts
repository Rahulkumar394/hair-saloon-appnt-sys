import { TestBed } from '@angular/core/testing';

import { RequestAgainService } from './request-again.service';

describe('RequestAgainService', () => {
  let service: RequestAgainService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RequestAgainService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
