import { TestBed } from '@angular/core/testing';

import { ViewShopServicesService } from './view-shop-services.service';

describe('ViewShopServicesService', () => {
  let service: ViewShopServicesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ViewShopServicesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
