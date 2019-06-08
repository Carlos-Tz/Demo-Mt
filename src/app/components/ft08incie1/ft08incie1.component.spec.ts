import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Ft08incie1Component } from './ft08incie1.component';

describe('Ft08incie1Component', () => {
  let component: Ft08incie1Component;
  let fixture: ComponentFixture<Ft08incie1Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Ft08incie1Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Ft08incie1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
