/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { VendingService } from './vending.service';

describe('Service: Vending', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [VendingService]
    });
  });

  it('should ...', inject([VendingService], (service: VendingService) => {
    expect(service).toBeTruthy();
  }));
});
