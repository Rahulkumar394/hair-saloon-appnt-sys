import { TestBed } from '@angular/core/testing';

import { ShopServiceInfoService } from './shop-service-info.service';

describe('ShopServiceInfoService', () => {
  let service: ShopServiceInfoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ShopServiceInfoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
