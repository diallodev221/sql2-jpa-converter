import { TestBed } from '@angular/core/testing';

import { SqlToJpaService } from './sql-to-jpa.service';

describe('SqlToJpaService', () => {
  let service: SqlToJpaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SqlToJpaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
