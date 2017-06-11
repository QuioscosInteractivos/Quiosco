import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanesDeEstudioComponent } from './planes-de-estudio.component';

describe('PlanesDeEstudioComponent', () => {
  let component: PlanesDeEstudioComponent;
  let fixture: ComponentFixture<PlanesDeEstudioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlanesDeEstudioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlanesDeEstudioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
