import { TestBed } from '@angular/core/testing';

import { MastermindSessionService } from './mastermind-session.service';

describe('MastermindSessionService', () => {
  let service: MastermindSessionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MastermindSessionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
