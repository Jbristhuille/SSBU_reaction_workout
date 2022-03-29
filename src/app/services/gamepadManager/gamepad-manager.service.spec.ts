import { TestBed } from '@angular/core/testing';

import { GamepadManagerService } from './gamepad-manager.service';

describe('GamepadManagerService', () => {
  let service: GamepadManagerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GamepadManagerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
