import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OperationarticleComponent } from './operationarticle.component';

describe('OperationarticleComponent', () => {
  let component: OperationarticleComponent;
  let fixture: ComponentFixture<OperationarticleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OperationarticleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OperationarticleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
