import { TestBed } from '@angular/core/testing';

import { FetchBookedSlotsService } from './fetch-booked-slots.service';

describe('FetchBookedSlotsService', () => {
  let service: FetchBookedSlotsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FetchBookedSlotsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
