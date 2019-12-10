import { TestBed, async, inject } from '@angular/core/testing';

import { ProjectEditGuard } from './project-edit.guard';

describe('ProjectEditGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ProjectEditGuard]
    });
  });

  it('should ...', inject([ProjectEditGuard], (guard: ProjectEditGuard) => {
    expect(guard).toBeTruthy();
  }));
});
