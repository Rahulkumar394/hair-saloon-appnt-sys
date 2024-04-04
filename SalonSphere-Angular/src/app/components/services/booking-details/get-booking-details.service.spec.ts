import { TestBed } from '@angular/core/testing';

import { GetBookingDetailsService } from './get-booking-details.service';

describe('GetBookingDetailsService', () => {
  let service: GetBookingDetailsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetBookingDetailsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
