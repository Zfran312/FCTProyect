import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserPaginatorComponent } from './user-paginator.component';

describe('PaginatorComponent', () => {
  let component: UserPaginatorComponent;
  let fixture: ComponentFixture<UserPaginatorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserPaginatorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserPaginatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
