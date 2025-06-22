import { TestBed } from '@angular/core/testing';

import { AdmBodegaService } from './adm-bodega.service';

describe('AdmBodegaService', () => {
  let service: AdmBodegaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdmBodegaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
