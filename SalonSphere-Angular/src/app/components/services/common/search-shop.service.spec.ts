import { TestBed } from '@angular/core/testing';

import { SearchShopService } from './search-shop.service';

describe('SearchShopService', () => {
  let service: SearchShopService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SearchShopService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
