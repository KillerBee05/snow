import { TestBed, inject } from '@angular/core/testing';

import { EditClientService } from './edit-client.service';

describe('EditClientService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EditClientService]
    });
  });

  it('should be created', inject([EditClientService], (service: EditClientService) => {
    expect(service).toBeTruthy();
  }));
});
