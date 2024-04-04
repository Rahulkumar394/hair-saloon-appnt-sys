import { TestBed } from '@angular/core/testing';

import { UpdateUserProfileService } from './update-user-profile.service';

describe('UpdateUserProfileService', () => {
  let service: UpdateUserProfileService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UpdateUserProfileService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
