import { TestBed } from '@angular/core/testing';

import { FetchEmpInfoService } from './fetch-emp-info.service';

describe('FetchEmpInfoService', () => {
  let service: FetchEmpInfoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FetchEmpInfoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
