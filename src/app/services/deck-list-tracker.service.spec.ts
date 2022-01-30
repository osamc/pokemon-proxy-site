import { TestBed } from '@angular/core/testing';

import { DeckListTrackerService } from './deck-list-tracker.service';

describe('DeckListTrackerService', () => {
  let service: DeckListTrackerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DeckListTrackerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
