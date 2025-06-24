import { TestBed } from '@angular/core/testing';

import { AdmUsuariosService } from './adm-usuarios.service';

describe('AdmUsuariosService', () => {
  let service: AdmUsuariosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdmUsuariosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
