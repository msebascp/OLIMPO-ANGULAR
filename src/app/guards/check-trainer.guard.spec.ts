import { TestBed } from '@angular/core/testing';

import { CheckTrainerGuard } from './check-trainer.guard';

describe('CheckTrainerGuard', () => {
  let guard: CheckTrainerGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(CheckTrainerGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
