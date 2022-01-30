import { TestBed } from '@angular/core/testing';

import { DecklistStorageService } from './decklist-storage.service';

describe('DecklistStorageService', () => {
  let service: DecklistStorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DecklistStorageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
