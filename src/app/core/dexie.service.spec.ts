/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { DexieService } from './dexie.service';

describe('Service: Dexie', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DexieService]
    });
  });

  it('should ...', inject([DexieService], (service: DexieService) => {
    expect(service).toBeTruthy();
  }));
});
