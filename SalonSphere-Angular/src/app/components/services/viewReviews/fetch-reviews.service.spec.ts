import { TestBed } from '@angular/core/testing';

import { FetchReviewsService } from './fetch-reviews.service';

describe('FetchReviewsService', () => {
  let service: FetchReviewsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FetchReviewsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
