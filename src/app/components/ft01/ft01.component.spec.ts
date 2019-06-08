import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Ft01Component } from './ft01.component';

describe('Ft01Component', () => {
  let component: Ft01Component;
  let fixture: ComponentFixture<Ft01Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Ft01Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Ft01Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
