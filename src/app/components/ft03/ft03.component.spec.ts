import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Ft03Component } from './ft03.component';

describe('Ft03Component', () => {
  let component: Ft03Component;
  let fixture: ComponentFixture<Ft03Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Ft03Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Ft03Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
