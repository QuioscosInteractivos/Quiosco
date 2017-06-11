import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseFinderComponent } from './course-finder.component';

describe('CourseFinderComponent', () => {
  let component: CourseFinderComponent;
  let fixture: ComponentFixture<CourseFinderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CourseFinderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CourseFinderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
