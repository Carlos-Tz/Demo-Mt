import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Ft08incie2Component } from './ft08incie2.component';

describe('Ft08incie2Component', () => {
  let component: Ft08incie2Component;
  let fixture: ComponentFixture<Ft08incie2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Ft08incie2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Ft08incie2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
