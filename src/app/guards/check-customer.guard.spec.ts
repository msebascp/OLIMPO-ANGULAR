import { TestBed } from '@angular/core/testing';

import { CheckCustomerGuard } from './check-customer.guard';

describe('CheckCustomerGuard', () => {
  let guard: CheckCustomerGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(CheckCustomerGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
