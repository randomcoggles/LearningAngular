/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ChecklistItemService } from './checklist-item.service';

describe('Service: ChecklistItem', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ChecklistItemService]
    });
  });

  it('should ...', inject([ChecklistItemService], (service: ChecklistItemService) => {
    expect(service).toBeTruthy();
  }));
});
