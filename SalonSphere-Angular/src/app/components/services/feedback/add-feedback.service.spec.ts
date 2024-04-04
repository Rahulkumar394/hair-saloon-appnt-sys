import { TestBed } from '@angular/core/testing';

import { AddFeedbackService } from './add-feedback.service';

describe('AddFeedbackService', () => {
  let service: AddFeedbackService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AddFeedbackService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
