import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Ft06Component } from './ft06.component';

describe('Ft06Component', () => {
  let component: Ft06Component;
  let fixture: ComponentFixture<Ft06Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Ft06Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Ft06Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
