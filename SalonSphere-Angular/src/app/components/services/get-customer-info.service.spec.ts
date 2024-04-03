import { TestBed } from '@angular/core/testing';

import { GetCustomerInfoService } from './get-customer-info.service';

describe('GetCustomerInfoService', () => {
  let service: GetCustomerInfoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetCustomerInfoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
