/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { CacheMenuService } from './cache-menu.service';

describe('Service: CacheMenu', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CacheMenuService]
    });
  });

  it('should ...', inject([CacheMenuService], (service: CacheMenuService) => {
    expect(service).toBeTruthy();
  }));
});
