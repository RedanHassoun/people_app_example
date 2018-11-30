import { TestBed, inject } from '@angular/core/testing';

import { ClientDataService } from './client-data.service';

describe('ClientDataService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ClientDataService]
    });
  });

  it('should be created', inject([ClientDataService], (service: ClientDataService) => {
    expect(service).toBeTruthy();
  }));
});
