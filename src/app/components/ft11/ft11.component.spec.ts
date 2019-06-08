import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Ft11Component } from './ft11.component';

describe('Ft11Component', () => {
  let component: Ft11Component;
  let fixture: ComponentFixture<Ft11Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Ft11Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Ft11Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
