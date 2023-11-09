import { TestBed } from '@angular/core/testing';

import { guardGuard } from './guard.guard';

describe('GuardGuard', () => {
  let guard: typeof guardGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(guardGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
