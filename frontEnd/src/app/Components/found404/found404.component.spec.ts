import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Found404Component } from './found404.component';

describe('Found404Component', () => {
  let component: Found404Component;
  let fixture: ComponentFixture<Found404Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Found404Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Found404Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
