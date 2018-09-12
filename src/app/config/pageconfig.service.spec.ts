import { TestBed, inject } from '@angular/core/testing';

import { PageconfigService } from './pageconfig.service';

describe('PageconfigService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PageconfigService]
    });
  });

  it('should be created', inject([PageconfigService], (service: PageconfigService) => {
    expect(service).toBeTruthy();
  }));
});
