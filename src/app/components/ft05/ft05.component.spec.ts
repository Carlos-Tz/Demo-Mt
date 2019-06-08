import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Ft05Component } from './ft05.component';

describe('Ft05Component', () => {
  let component: Ft05Component;
  let fixture: ComponentFixture<Ft05Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Ft05Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Ft05Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
