import { TestBed } from '@angular/core/testing';

import { SaveTransactionService } from './save-transaction.service';

describe('SaveTransactionService', () => {
  let service: SaveTransactionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SaveTransactionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
