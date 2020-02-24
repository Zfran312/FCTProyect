import { TestBed } from '@angular/core/testing';

import { AuthmanagerService } from './authmanager.service';

describe('AuthmanagerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AuthmanagerService = TestBed.get(AuthmanagerService);
    expect(service).toBeTruthy();
  });
});
