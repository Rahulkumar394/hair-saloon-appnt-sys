import { TestBed } from '@angular/core/testing';

import { FetchEmployeeService } from './fetch-employee.service';

describe('FetchEmployeeService', () => {
  let service: FetchEmployeeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FetchEmployeeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
