import { TestBed } from '@angular/core/testing';

import { SweetAlertsService } from './sweet-alerts.service';

describe('SweetAlertsService', () => {
  let service: SweetAlertsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SweetAlertsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
