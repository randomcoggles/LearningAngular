/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { LoadSeedDataService } from './load-seed-data.service';

describe('Service: LoadSeedData', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LoadSeedDataService]
    });
  });

  it('should ...', inject([LoadSeedDataService], (service: LoadSeedDataService) => {
    expect(service).toBeTruthy();
  }));
});
