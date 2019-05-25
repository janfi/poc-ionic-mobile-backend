import { TestBed } from '@angular/core/testing';

import { MobileBackendService } from './mobile.backend.service';

describe('Mobile.BackendService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MobileBackendService = TestBed.get(MobileBackendService);
    expect(service).toBeTruthy();
  });
});
