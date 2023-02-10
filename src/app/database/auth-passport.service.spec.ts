import { TestBed } from '@angular/core/testing';

import { AuthPassportService } from './auth-passport.service';

describe('AuthPassportService', () => {
  let service: AuthPassportService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthPassportService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
