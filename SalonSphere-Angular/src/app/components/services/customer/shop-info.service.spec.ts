import { TestBed } from '@angular/core/testing';

import { ShopInfoService } from './shop-info.service';

describe('ShopInfoService', () => {
  let service: ShopInfoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ShopInfoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
