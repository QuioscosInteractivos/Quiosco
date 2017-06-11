import { TestBed, inject } from '@angular/core/testing';

import { FindCourseService } from './find-course.service';

describe('FindCourseService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FindCourseService]
    });
  });

  it('should be created', inject([FindCourseService], (service: FindCourseService) => {
    expect(service).toBeTruthy();
  }));
});
