import { TestBed } from '@angular/core/testing';

import { SummaryGuardService } from './summary-guard.service';

describe('SummaryGuardService', () => {
  let service: SummaryGuardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SummaryGuardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
