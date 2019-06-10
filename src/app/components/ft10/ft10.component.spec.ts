import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Ft10Component } from './ft10.component';

describe('Ft10Component', () => {
  let component: Ft10Component;
  let fixture: ComponentFixture<Ft10Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Ft10Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Ft10Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
