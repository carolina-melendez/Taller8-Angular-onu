import { TestBed } from '@angular/core/testing';

import { PaisesApiService } from './paises-api.service';

describe('PaisesApiService', () => {
  let service: PaisesApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PaisesApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
