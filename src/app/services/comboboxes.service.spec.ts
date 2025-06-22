import { TestBed } from '@angular/core/testing';

import { ComboboxesService } from './comboboxes.service';

describe('ComboboxesService', () => {
  let service: ComboboxesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ComboboxesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
