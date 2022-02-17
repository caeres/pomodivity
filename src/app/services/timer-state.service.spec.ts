import { TestBed } from '@angular/core/testing';

import { TimerStateService } from './timer-state.service';

describe('TimerStateService', () => {
  let service: TimerStateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TimerStateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
