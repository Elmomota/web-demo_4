import { TestBed } from '@angular/core/testing';

import { AdmPiezasService } from './adm-piezas.service';

describe('AdmPiezasService', () => {
  let service: AdmPiezasService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdmPiezasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
