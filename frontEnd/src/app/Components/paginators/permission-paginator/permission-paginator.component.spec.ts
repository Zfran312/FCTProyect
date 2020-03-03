import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PermissionPaginatorComponent } from './permission-paginator.component';

describe('PermissionPaginatorComponent', () => {
  let component: PermissionPaginatorComponent;
  let fixture: ComponentFixture<PermissionPaginatorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PermissionPaginatorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PermissionPaginatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
