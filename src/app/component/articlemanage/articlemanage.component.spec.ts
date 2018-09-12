import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticlemanageComponent } from './articlemanage.component';

describe('ArticlemanageComponent', () => {
  let component: ArticlemanageComponent;
  let fixture: ComponentFixture<ArticlemanageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArticlemanageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArticlemanageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
