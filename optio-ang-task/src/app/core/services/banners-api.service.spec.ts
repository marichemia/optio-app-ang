import { TestBed } from '@angular/core/testing';

import { BannersApiService } from './banners-api.service';

describe('BannersApiService', () => {
  let service: BannersApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BannersApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
