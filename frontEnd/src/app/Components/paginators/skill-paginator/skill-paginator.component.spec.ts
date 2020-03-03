import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SkillPaginatorComponent } from './skill-paginator.component';

describe('SkillPaginatorComponent', () => {
  let component: SkillPaginatorComponent;
  let fixture: ComponentFixture<SkillPaginatorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SkillPaginatorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SkillPaginatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
