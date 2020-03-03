import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RolePaginatorComponent } from './role-paginator.component';

describe('RolePaginatorComponent', () => {
  let component: RolePaginatorComponent;
  let fixture: ComponentFixture<RolePaginatorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RolePaginatorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RolePaginatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
